import React, { Component } from 'react';
import Carousel from './Carousel';
import pet from '@frontendmasters/pet';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';
import { navigate } from '@reach/router';
import Modal from './Modal';

class Details extends Component {
  state = {
    loading: true,
    showModal: false
  };

  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState(
        {
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.city}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
          url: animal.url
        },
        console.error
      );
    });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => window.open(this.state.url);

  render() {
    const {
      animal,
      breed,
      location,
      description,
      name,
      loading,
      media,
      showModal
    } = this.state;
    if (loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="details">
        <div style={{ textAlign: 'center' }}>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <Carousel media={media} />
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal && (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>
                    No, I&apos;m a monster
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
