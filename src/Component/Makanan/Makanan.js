import React, { Fragment } from 'react';
import MakananItem from './MakananItems/MakananItems';
import TentangMakanan from './TentangMakanan';

const Makanan = () => {
  return (
    <Fragment>
      <TentangMakanan />
      <MakananItem />
    </Fragment>
  );
};

export default Makanan;
