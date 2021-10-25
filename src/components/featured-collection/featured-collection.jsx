// Affiche 4 sacs en utilisant 'FeatureProduct'
import React, { useContext } from 'react';
import { ProductsContext } from '../../context/products-context'       
import FeaturedProduct from '../shared/featured-product';

const FeatureCollection = () => {
  const { products } = useContext(ProductsContext)           // Importe les items du store
  const productItems = products.filter((product, i) => i < 4).map(product => ( 
    <FeaturedProduct {...product} key={product.id} />
  ));

  return ( 
    <div className='featured-collection container'>
      <h2 className='featured-section-title'>Feature Collection</h2>
      <div className='products'>
        { productItems }
      </div>
    </div>
   );
}
 
export default FeatureCollection;