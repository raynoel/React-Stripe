// Affiche un rectangle qui couvre environ 50% de la hauteur de la page et contenat un produit vedette
// Affiche une photo a gauche et un titre + légende + bouton à droite
import React from 'react';
import { withRouter } from 'react-router-dom';
import studioBag from '../../assets/studio-bag.jpg';
import './main-section.scss';

const MainSection = ({ history }) => {
  return (
    <div className='main-section-container'>
      <div className='main-section-middle'>
        {/* image dans la case de gauche */}
        <div className='ms-m-image'>
          <img src={studioBag} alt='studio bag'/>
        </div>
        {/*  titre + légende + bouton  */}
        <div className='ms-m-description'>
          <h2>Designed for fashion. Crafted for sport.</h2>
          <p>We make products that effortlessly transition from day to night. 
            From the board room to the fitness studio, and everywhere in between, 
            each Nomads piece is thoughtfully created to be the perfect balance of 
            form and function.
          </p>
          <button className='button is-black' id='shop-now' onClick={()=> history.push('/product/1')}>STUDIO BAG</button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MainSection);