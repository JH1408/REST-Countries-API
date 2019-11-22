import React from 'react';

const Dropdown = ({select}) => {
  return (
    <select onChange={select}>
      <option selected disabled hidden>Filter by Region</option>
      <option value="Africa">Africa</option>
      <option value="America">America</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  )
}

export default Dropdown;
