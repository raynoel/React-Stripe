// Affiche un icone de shopping-bag + une bulle contenant le nb d'items dans le cart
// Nous redirige vers '/cart' lorsqu'on clique dessus
import React from 'react';
import { withRouter } from 'react-router-dom';                        // withRouter pour les composants qui n'ont pas de routes à afficher, mais utilisent l'history pour rediriger
import shoppingBag from '../../assets/shopping-bag.png';      
import './cart-icon.scss';

const CartIcon = ({ history }) => {
  return (
    <div onClick={() => history.push('/cart')} className='cart-container'>
      <img src={shoppingBag} alt='shopping-cart-icon' />
      <span className='cart-count'> 5 </span>     {/* Affiche la qty si itemCount > 0 */}
    </div>
  );
}

export default withRouter(CartIcon);