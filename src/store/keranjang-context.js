import React from 'react';

const KeranjangContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart:() => {},
});

export default KeranjangContext;
