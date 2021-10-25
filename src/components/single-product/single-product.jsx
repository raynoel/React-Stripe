// '/product/:id' affiche une page contenant les détails d'un sac en magasin
import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ProductsContext } from '../../context/products-context';
import Layout from '../shared/layout';
import './single-product.scss';

const SingleProduct = ({ match, history: { push } }) => {   // Match obtient les params passé dans le url; history redirige
  const { products } = useContext(ProductsContext);         // Obtient la liste des produits 
  const { id } = match.params;                              // Extrait le 'id' des params
  const [ product, setProduct ] = useState(null);           // Obtient l'obj contenant le produit à afficher
  
  // useEffect est exécuté lorsque le composant mount ou rafraichi ou la DB est modifiée
  // On utlise useEffect pour obtenir les infos du sac de la DB
  useEffect(() => {
    const product = products.find(item => Number(item.id) === Number(id)); // Cherche le produit à afficher dans la DB
    if (!product) return push('/shop');
    setProduct(product);
  }, [id, product, push, products]);

  if (!product) return null;                                // while we search for a product

  const { imageUrl, title, price, description } = product;

  return (
    <Layout>
      <div className='single-product-container'>
        {/* image à gauche*/}
        <div className='product-image'>
          <img src={imageUrl} alt='product' />
        </div>
        {/* boutons + texte a droite */}
        <div className='product-details'>
          <h1>{ title }</h1>
          <p>${ price }</p>
          <div className='add-to-cart-btns'>
            <button className='button is-white nomad-btn' id='btn-white-outline'>ADD TO CART</button>
            <button className='button is-black nomad-btn' id='btn-white-outline'>PROCEED TO CHECKOUT</button>
          </div>
          <div className='product-description'>
            <p>{ description }</p>
          </div>
        </div>

      </div>
    </Layout>
  )
}
export default withRouter(SingleProduct);

