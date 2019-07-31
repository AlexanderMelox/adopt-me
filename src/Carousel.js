import React, { Component } from 'react';

class Carousel extends Component {
  state = {
    photos: this.props.media.map(({ large }) => large) || [
      'http://placecorgi.com/600/600'
    ],
    active: 0
  };

  handleIndexClick = event => {
    this.setState({ active: +event.target.dataset.index });
  };

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? 'active' : ''}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
