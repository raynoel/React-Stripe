// Importé dans index.js
// Cart contient { cartItems, count, totalPrice } + les fcts pour ajouter, augmenter, diminuer ou suprimer des items
// CartItems contient la liste de { product, quantity } 
// Wrap 'App.js' qui rend le cart disponibles a tous les enfants de App
import React, { createContext, useReducer } from 'react';
import cartReducer, { sumItems } from './cart-reducer';

export const CartContext = createContext();                                                 // Cré un simili-store
const cartFromStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [] ; // Obtient le cart du localStorage 
// const initialState = { cartItems: [], itemCount: 0, total: 0 }                           // Initialise un cart vide
const initialState = { cartItems: cartFromStorage, ...sumItems(cartFromStorage) }           // Initialise un cart avec le contenu de localStorage

// Composant qui fournit le contexte aux composants enfants
const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);    // Array destructuring. Assigne la valeur du premier élément de la liste à 'state' et le second au nom de fct 'dispatch'
  const addProduct    = ( product ) => dispatch({ type: 'ADD_ITEM', payload: product });    // fct pour ajouter au simili-store
  const increase      = ( product ) => dispatch({ type: 'INCREASE', payload: product });    // fct pour ajouter
  const decrease      = ( product ) => dispatch({ type: 'DECREASE', payload: product });    // fct pour supprimer 
  const removeProduct = ( product ) => dispatch({ type: 'REMOVE_ITEM', payload: product }); // fct pour supprimer
  const clearCart     = ()          => dispatch({ type: 'CLEAR' });

  const contextValues = { ...state, addProduct, increase, decrease, removeProduct, clearCart }
  
  return (
    <CartContext.Provider value={ contextValues }>
      { children }
    </CartContext.Provider>
  )
}

export default CartContextProvider;