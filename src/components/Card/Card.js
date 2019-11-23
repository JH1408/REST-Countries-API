import React from 'react';

const Card = (props) => {
  return (
    <div
      className="card"
      onClick={() => props.clicked(props.name)}>
      <img src={props.flag} alt="Flag"/>
      <div>
        <p>{props.name}</p>
        <p><span>Population: </span>{props.population}</p>
        <p><span>Region: </span>{props.region}</p>
        <p><span>Capital: </span>{props.capital}</p>
      </div>
    </div>
  )
}

export default Card;
