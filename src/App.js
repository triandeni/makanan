import { useState } from 'react';
import Keranjang from './Component/Keranjang/Keranjang';
import Header from './Component/Layout/Header';
import Makanan from './Component/Makanan/Makanan';
import KeranjangProvider from './store/KeranjangProvider';

function App() {
  const [CartIsShow, setCarIsShow] = useState(false);

  const showCartHandler = () => {
    setCarIsShow(true);
  };

  const hideCartHandler = () => {
    setCarIsShow(false);
  };
  return (
    <KeranjangProvider>
      {CartIsShow && <Keranjang onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Makanan />
      </main>
    </KeranjangProvider>
  );
}

export default App;
