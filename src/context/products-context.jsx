// Importé dans index.js
// Wrap 'App' afin de créer un store provider qui rendra la DB des products en vente a tous les enfants de App
import React, { createContext, useState } from 'react';
import SHOP_DATA from '../shop/index';


export const ProductsContext = createContext();               // Cré un simili-store

const ProductsContextProvider = ({children}) => {
  const [ products ] = useState(SHOP_DATA)                    // importe la liste des produits contenus dans SHOP_DATA
  return ( 
    // Rend le simili-store disponible aux enfants
    <ProductsContext.Provider value={{ products: products }}>           
      { children }
    </ProductsContext.Provider>
   );
}
 
export default ProductsContextProvider;