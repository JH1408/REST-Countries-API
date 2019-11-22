import React from 'react';

const Card = (props) => {
  return (
    <div onClick={() => props.clicked(props.name)}>
      <img src={props.flag}/>
      <p>{props.name}</p>
      <p>{props.capital}</p>
      <p>{props.region}</p>
      <p>{props.population}</p>
    </div>
  )
}

export default Card;
