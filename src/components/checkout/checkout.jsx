// http://localhost:3000/checkout affiche le nb d'items contenus dans le cart et le montant de la commande

  import React, { useContext, useState } from "react";
  import { CartContext } from "../../context/cart-context";
  import Layout from "../shared/layout";
  // import StripeCheckout from "./stripe-checkout/stripe-checkout"; //  Composant utilisé lorsqu'on envoie le client chez Stripe pour payer au lieu d'utiliser notre propre page présentation de la page de paiement
  import CustomCheckout from "./custom-checkout/custom-checkout";
  import ShippingAddress from "./custom-checkout/shipping-address";
  import './checkout.scss';

  const Checkout = () => {
    const { total, itemCount, cartItems } = useContext(CartContext);
    const [ shipping, setShipping ] = useState(null);
    const addressShown = {
      display: (shipping ? 'none' : 'block')
    }
    const cardShown = {
      display: (shipping ? 'block' : 'none')
    }


    return (
      <Layout>
        <div className="checkout">
          <h2>Checkout Summary</h2>
          <h3>Total Items { itemCount }</h3>
          <h4>Amount to pay: ${ total }</h4>
          {/* <StripeCheckout />                    Composant utilisé lorsqu'on envoie le client chez Stripe pour payer la facture */}
          <div style={addressShown}>
            <ShippingAddress setShipping={setShipping} />
          </div>
          <div style={cardShown}>
            <CustomCheckout { ...{ shipping, cartItems }}/>
          </div>
        </div>
      </Layout>
    )
  }

  export default Checkout;