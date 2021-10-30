// Affiche un icone de shopping-bag + une bulle contenant le nb d'items dans le cart
// Nous redirige vers '/cart' lorsqu'on clique dessus
import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';                        // withRouter pour les composants qui n'ont pas de routes à afficher, mais utilisent l'history pour rediriger
import shoppingBag from '../../assets/shopping-bag.png';      
import { CartContext } from '../../context/cart-context';
import './cart-icon.scss';

const CartIcon = ({ history }) => {
  const { itemCount } = useContext(CartContext);
  return (
    <div onClick={() => history.push('/cart')} className='cart-container'>
      <img src={shoppingBag} alt='shopping-cart-icon' />
      { itemCount > 0 ? <span className='cart-count'> {itemCount} </span> : null } {/* Affiche la qty si itemCount > 0 */}
    </div>
  );
}

export default withRouter(CartIcon);