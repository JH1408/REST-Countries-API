import React from 'react';
import Moon from '../../assets/img/moon-regular.svg';
import MoonLight from '../../assets/img/moon-solid.svg';

const Header = ({switchMode, isDark}) => {
  return (
    <div className="header">
      <h1>Where in the world?</h1>
      <div onClick={switchMode}>
        <img src={isDark ? MoonLight : Moon} alt=""/>
        <p>Dark Mode</p>
      </div>
    </div>
  )
}

export default Header;
