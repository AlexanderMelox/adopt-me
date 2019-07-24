import React, { useState } from 'react';

const useDropdown = (label, initialValue, options) => {
  const [value, setValue] = useState(initialValue);
  const id = `use-dropdown-${label.replace(' ', '-').toLowerCase()}`;
  const Dropdown = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={e => setValue(e.target.value)}
        disabled={options.length === 0}
      >
        <option>All</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );

  return [value, Dropdown, setValue];
};

export default useDropdown;
