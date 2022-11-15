import React, { useContext, useEffect, useState } from 'react';
import KeranjangContext from '../../store/keranjang-context';
import CartIcon from '../Keranjang/CartIcon';
import './HeaderCart.css'

const HeaderCart = (props) => {
  const [btnHighLight, setBtnHightLight] = useState(false);
  const cartCtx = useContext(KeranjangContext);

  const { items } = cartCtx;
  const numberOfCartitems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // const BtnClasses = `${classes.button} ${btnHighLight ? classes.bump : ''}`;
  const BtnClasses = btnHighLight  ? 'bump' : '' ;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHightLight(true);

    const timer = setTimeout(() => {
      setBtnHightLight(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <div className={BtnClasses}>
    <button className='button' onClick={props.onShowCart}>
      <span className='icon'>
        <CartIcon />
      </span>
  

      <span className='badge'>{numberOfCartitems}</span>
    </button>
    </div>
  );
};

export default HeaderCart;
