// Importé dans index.js
// Cart contient { cartItems, count, totalPrice } et des fonctions pour ajouter. augmenter, diminuer la qty ou suprimer des items
// CartItems contient la liste de { product, quantity } 
// Wrap  App afin de créer un store provider qui rendra le cart disponibles a tous les enfants de App
import React, { createContext, useReducer } from 'react';
import cartReducer, { sumItems } from './cart-reducer';

export const CartContext = createContext();                                             // Cré un simili-store
const cartFromStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [] ; // Obtient le cart enregistré dans le localStorage 
// const initialState = { cartItems: [], itemCount: 0, total: 0 }                       // Initialise un cart vide
const initialState = { cartItems: cartFromStorage, ...sumItems(cartFromStorage) }       // Initialise un cart avec le contenu de localStorage

// Wrapper qui offre le simili-store à ses enfants
const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addProduct = ( product ) => dispatch({ type: 'ADD_ITEM', payload: product });   // fct pour ajouter au simili-store
  const increase   = ( product ) => dispatch({ type: 'INCREASE', payload: product });   // fct pour ajouter au simili-store
  const decrease   = ( product ) => dispatch({ type: 'DECREASE', payload: product });   // fct pour supprimer au simili-store
  const removeProduct= ( product ) => dispatch({ type: 'REMOVE_ITEM', payload: product });
  const clearCart  = () => dispatch({ type: 'CLEAR' });

  const contextValues = { 
    ...state,
    addProduct,
    increase,
    decrease,
    removeProduct,
    clearCart
  }
  
  return (
    <CartContext.Provider value={ contextValues }>
    { children }
    </CartContext.Provider>
  )
}

export default CartContextProvider;