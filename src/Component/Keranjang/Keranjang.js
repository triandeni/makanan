import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import './Keranjang.css';
import KeranjangContext from '../../store/keranjang-context';
import KeranjangItem from './KeranjangItem';
import Checkout from './Checkout';
import React from 'react';

const Keranjang = (props) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmit, setIsSubmit] = useState();
  const [didSubmit, setDidSubmit] = useState();
  const cartCTX = useContext(KeranjangContext);

  const totalAmount = `Rp. ${cartCTX.totalAmount.toFixed(3)}`;
  const hasitem = cartCTX.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCTX.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCTX.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
      setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmit(true)
    await fetch('https://meals-2260c-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCTX.items
      })
    });
    setIsSubmit(false)
    setDidSubmit(true)
    cartCTX.clearCart();
  }

  const cartItems = (
    <ul className="cart-items">
      {cartCTX.items.map((item) => (
        <KeranjangItem 
        key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null, item.id)} 
        onAdd={cartItemAddHandler.bind(null, item)} />
      ))}
    </ul>
  );

  const modalAction =  
   <div className="actions">
  <button className="button--alt" onClick={props.onHideCart}>
    Close
  </button>
  {hasitem && <button className="order" onClick={orderHandler}>Order</button>}
</div>

const cartModalContent = (
    <React.Fragment>
      {cartItems}
        <div className="total">
          <span>Jumlah Total</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onKonfir={submitOrderHandler} onCancel ={props.onHideCart} />}
        {!isCheckout && modalAction}
    </React.Fragment> )

    const isSubmitModalContent = <p>Mengirim Pesanan Anda!</p>

    const didSubmitModalContent = <React.Fragment>
    <p>Sukses Mengirim Pesanan Anda!</p>
    <div className="actions">
  <button className="button--alt" onClick={props.onHideCart}>
    Close
  </button>
</div>
</React.Fragment>

  return (
    <Modal onHideCart={props.onHideCart}>
    {!isSubmit && !didSubmit && cartModalContent}
    {isSubmit && isSubmitModalContent}
    {!isSubmit && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Keranjang;
