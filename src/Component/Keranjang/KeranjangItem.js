import './KeranjangItem.css';

const KeranjangItem = (props) => {
  const price = `Rp. ${props.price.toFixed(3)}`;

  return (
    <li className="cart-item">
      <div>
        <h2>{props.name}</h2>

        <span className="pricee">{price}</span>
      </div>
      <div className="actions">
        <button onClick={props.onRemove}>−</button>
        <span className="amount">{props.amount}</span>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default KeranjangItem;
