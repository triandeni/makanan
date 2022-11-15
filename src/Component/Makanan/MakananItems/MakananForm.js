import { useRef, useState } from 'react';
import './MakananForm.css';

const MakananForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const inputId = `ammount ${props.id}`;

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="input">
        <label htmlFor="amount">Jumlah</label>
        <input ref={amountInputRef} id={inputId} type="number" min="1" max="5" step="1" defaultValue="1" />
      </div>

      <button>Tambah</button>
      {!amountIsValid && <p>silakan masukkan jumlah yang valid (1-5)</p>}
    </form>
  );
};

export default MakananForm;
