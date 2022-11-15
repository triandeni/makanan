import { useRef, useState } from 'react';
import './Checkout.css';

const Checkout = (props) => {
    const [formValidasi, setFormValidasi] = useState({
        nama:true,
        jalan: true,
        kota: true,
        KodePos: true,
    })
    const isEmpty = value => value.trim() === '';
    const isFiveChars = value => value.trim().length !== 5;

    const namaInputRef = useRef()
    const jalanInputRef = useRef()
    const KodePosInputRef = useRef()
    const KotaInputRef = useRef()
  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredNama = namaInputRef.current.value;
    const enteredJalan = jalanInputRef.current.value;
    const enteredKodePost = KodePosInputRef.current.value;
    const enteredKota = KotaInputRef.current.value;

    const enteredNamaIsValid = !isEmpty(enteredNama)
    const enteredJalanIsValid = !isEmpty(enteredJalan)
    const enteredKotaIsValid =  !isEmpty(enteredKota)
    const enteredKodePosIsValid = !isFiveChars(enteredKodePost)

    setFormValidasi({
        nama:enteredNamaIsValid,
        jalan:enteredJalanIsValid,
        kota: enteredKotaIsValid,
        KodePos: enteredKodePosIsValid
    });

    const formIsValid = 
        enteredNamaIsValid && 
        enteredJalanIsValid && 
        enteredKotaIsValid && 
        enteredKodePosIsValid;


    if(!formIsValid) {
        return;
    }

    props.onKonfir({
        name: enteredNama,
        jalan:enteredJalan,
        city:enteredKota,
        KodePos:enteredKodePost,
    })
  };

  const namaControlClasses = `control ${formValidasi.nama  ? '' : 'invalid'}`;
  const jalanControlClasses = `control ${formValidasi.jalan ? '' : 'invalid'}`;
  const kodePosControlClasses = `control ${formValidasi.KodePos ? '' : 'invalid'}`;
  const kotaControlClasses  = `control ${formValidasi.kota ? '' : 'invalid'}`;

  return (
    <form className='formCheckout' onSubmit={confirmHandler}>
        
      <div className={namaControlClasses}>
        <label htmlFor='name'>Nama</label>
        <input type='text' id='name'  ref={namaInputRef}/>
        {!formValidasi.nama && <p className='invalid'>harap masukkan nama yang valid !</p>}
     
      </div>
      <div className={jalanControlClasses}>
        <label htmlFor='street'>Nama Jalan</label>
        <input type='text' id='street' ref={jalanInputRef} />
        {!formValidasi.jalan && <p>harap masukkan nama jalan yang valid !</p>}
      </div>
      <div className={kodePosControlClasses}>
        <label htmlFor='postal'>Kode Pos</label>
        <input type='text' id='postal' ref={KodePosInputRef} />
        {!formValidasi.KodePos && <p>harap masukkan kode pos yang valid !</p>}
      </div>
      <div className={kotaControlClasses}>
        <label htmlFor='city'>Kota</label>
        <input type='text' id='city' ref={KotaInputRef}/>
        {!formValidasi.kota && <p>harap masukkan nama kota yang valid !</p>}
      </div>
      <div className='actions'>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className='submit'>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;