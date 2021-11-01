// Composant qui contient un champ pour le courriel et un bouton 'Checkout' qui actionne les actions suivantes:
// 1. cré une liste des items contenus dans le cart 
// 2. Envoie la liste au backend qui la transmet à stripe pour obtenir une 'sessionId' (no de facture)
// 3. Envoie le client avec son no de facture chez Stripe
import React, { useContext, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { CartContext } from '../../../context/cart-context';
import { fetchFromAPI } from '../../../helpers';

const StripeCheckout = () => {
  const [email, setEmail] = useState('');
  const { cartItems } = useContext(CartContext);
  const stripe = useStripe();

  // 1. cré une liste des items dans le cart 2. envoie au backend pour obtenir une 'sessionId' de Stripe 3. envoie le client chez stripe
  const handleGuestCheckout = async (e) => {
    e.preventDefault();                                               // Empèche la soumission du formulaire

    // 1. Cré une liste des items contenu dans le cart 
    const line_items = cartItems.map(item => {        
      return {
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: item.price * 100,                              // montant en cents
          product_data: {
            name: item.title,
            description: item.description,
            images: [item.imageUrl],
          }
        }
      }
    });

    // 2. appel l'API et transmet line_items + courriel
    const response = await fetchFromAPI('create-checkout-session', {  
      body: { line_items, customer_email: email },
    });
    const { sessionId } = response;                                   // Extrait 'sessionId' de la réponse

    // 3. Envoie le client chez Stripe
    const { error } = await stripe.redirectToCheckout({ sessionId }); // Extrait 'error' dans le cas ou 'sessionId' est invalide
    if (error) { console.log(error); }
  }
    

  return (
    <form onSubmit={handleGuestCheckout}>
      <div>
        <input type='email' onChange={e => setEmail(e.target.value)} placeholder='Email' value={email} className='nomad-input' />
      </div>
      <div className='submit-btn'>
        <button type='submit' className='button is-black nomad-btn submit'>Checkout</button>
      </div>
    </form>
  );
}

export default StripeCheckout;