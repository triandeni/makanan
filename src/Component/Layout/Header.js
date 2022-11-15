import React, { Fragment } from 'react';
import './Header.css';
import mieAyam from '../../assets/mie_ayam.jpg';
import HeaderCart from './HeaderCart';

const Header = (props) => {
  return (
    <Fragment>
      <header className="header">
        <h1>Mie Ayam</h1>
        <HeaderCart onShowCart={props.onShowCart} />
      </header>
      <div className="main-image">
        <img src={mieAyam} alt="mie ayam" />
      </div>
    </Fragment>
  );
};
export default Header;
