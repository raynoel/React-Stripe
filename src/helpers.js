// Contient des fcts utilisées par plusieurs composants

// Vérifie si le produit est dans le cart -- isInCart(product, cartItems). Utilisé pour afficher "ADD IN CART" ssi l'item n'est pas dans le cart
export const isInCart = (product, cartItems) => {
  return cartItems.find(item => item.id === product.id);
}


// Fct pour simplifier les requêtes a nos API
// const response = await fetchFromAPI('nom-de-API', { body: { line_items, customer_email: email } });
const API = 'http://localhost:8080';

export async function fetchFromAPI(endpoint, opts) {
  const { method, body } = { method: 'POST', body: null, ...opts };                     // Initialise method + body
  const res = await fetch(`${API}/${endpoint}`, {                                       // fait une requête sur le backend
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}   