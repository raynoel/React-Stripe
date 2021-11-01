// http://localhost:3000/checkout; Comptoir caisse: Page affichant le contenu du cart et le montant de la commande
import React, { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import Layout from "../shared/layout";                             // Header & Footer
import StripeCheckout from "./stripe-checkout/stripe-checkout";
import './checkout.scss';

const Checkout = () => {
  const { itemCount, total } = useContext(CartContext);


  return (
    <Layout>
      <div className="checkout">
        <h2>Checkout Summary</h2>
        <h3>Total Items { itemCount }</h3>
        <h4>Amount to pay: ${ total }</h4>
        <StripeCheckout /> 
      </div>
    </Layout>
  )
}

export default Checkout;