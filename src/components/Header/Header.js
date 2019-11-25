import React from 'react';
import Moon from '../../assets/img/moon-regular.svg';

const Header = ({switchMode}) => {
  return (
    <div className="header">
      <h1>Where in the world?</h1>
      <div onClick={switchMode}>
        <img src={Moon} alt=""/>
        <p>Dark Mode</p>
      </div>
    </div>
  )
}

export default Header;
