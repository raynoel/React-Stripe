// '/shop' affiche tous les produits en vente
import React, { useContext } from 'react';
import Layout from '../../shared/layout';
import FeaturedProduct from '../../shared/featured-product';
import { ProductsContext } from '../../../context/products-context';
import './shop.scss';

const Shop = () => {
  const { products } = useContext(ProductsContext);                     // Obtient tous les items du store
  const allProducts = products.map(product => (
    <FeaturedProduct {...product} key={product.id} />
  ));

  return (
    <Layout>
      <div className='product-list-container'>
        <h2 className='product-list-title'>Shop</h2>
        <div className='product-list'>
          { allProducts }
        </div>
      </div>
    </Layout>
  )
}

export default Shop;