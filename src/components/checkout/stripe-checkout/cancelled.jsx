// Utilisé par le backend lorsque la transaction Stripe échoue 
// Le backend redige l'usagé ici et on lui indique que la transaction a échouée
import React from "react";
import { withRouter } from "react-router";
import Layout from '../../shared/layout';

const Cancelled = ({ history }) => {
  return (
    <Layout>
      <div className='checkout'>
        <h1>Payment failed</h1>
        <p>Payment was not successful</p>
        <div>
          <button className='button is-black nomad-btn submit' onClick={() => history.push('shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default withRouter(Cancelled);