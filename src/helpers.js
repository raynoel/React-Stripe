// Contient des fcts utilisées par plusieurs composants
// import { auth } from './firebase/index';

// Vérifie si le produit est dans le cart -- isInCart(product, cartItems). Utilisé pour afficher "ADD IN CART" ssi l'item n'est pas dans le cart
export const isInCart = (product, cartItems) => {
  return cartItems.find(item => item.id === product.id);
}


// Fct pour faire des requêtes a un API sur notre backend 
// l'appel sera sous la forme suivante: const response = await fetchFromAPI('create-checkout-session', { body: { line_items, customer_email: email } });
// const API = 'http://localhost:8080';

// export async function fetchFromAPI(endpoint, opts) {
//   const { method, body } = { method: 'POST', body: null, ...opts };                     // Initialise method + body
//   const user = auth.currentUser;                                                        // Obtient l'usagé présentement signedIn
//   const token = user && (await user.getIdToken());                                      // Obtient le token émis par firebase
//   const res = await fetch(`${API}/${endpoint}`, {                                       // fait une requête sur le backend
//     method,
//     ...(body && { body: JSON.stringify(body) }),
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`
//     },
//   });

//   if (res.status === 200) {
//     return res.json();
//   } else {
//     throw new Error(res.statusText);
//   }
// }   