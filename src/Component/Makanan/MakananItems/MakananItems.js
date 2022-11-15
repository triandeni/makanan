import Card from '../../UI/Card';

import './MakananItem.css';
import MakananForm from './MakananForm';
import { useContext, useEffect, useState } from 'react';
import KeranjangContext from '../../../store/keranjang-context';

export const MakananItem = (props) => {
  const cartCTX = useContext(KeranjangContext);
  const price = `RP. ${props.price.toFixed(3)}`;

  const onAddToCartHandler = (amount) => {
    cartCTX.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className="meal">
      <div>
        <h3>{props.name}</h3>
        <div className="description">{props.description}</div>
        <div className="price">{price}</div>
      </div>
      <div>
        <MakananForm onAddToCart={onAddToCartHandler} />
      </div>
    </li>
  );
};

const ListMakanan = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState();

  useEffect(() => {
      const fetchMeals = async () => {
        setIsLoading(true)
        const response = await fetch('https://meals-2260c-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
        
        if(!response.ok) {
          throw new Error('Something went wrong !')
        } 
        
        const responseData = await response.json();

        const loadedMeals = []

        for (const key in responseData) {
          loadedMeals.push({
            id:key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        };
        setMeals(loadedMeals);
        setIsLoading(false)
      };

      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message)
      });
  }, []);

  if(isLoading) {
    return(
    <section className='loading'>
      <p>tunggu ...</p>
    </section>
    )
  }

  if(httpError) {
    return (
      <section className='error'>
        <p>{httpError}</p>
      </section>
    )
  }

  
  const list = meals.map((makanan) => (    
      <MakananItem key={makanan.id} id={makanan.id} name={makanan.name} description={makanan.description} price={makanan.price} />
  ));
  return (
    <section className="meals">
      <Card>
        <ul>{list}</ul>
      </Card>
    </section>
  );
};

export default ListMakanan;
