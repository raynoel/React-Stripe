// Le reducer est une fonction qu prend une 'state' et une 'action' en arguments et qui retourne le 'state' transformé
// Cart contient { cartItems, count, totalPrice } et des fonctions pour ajouter. augmenter, diminuer ou suprimer des items ou effacer le cart
// CartItems contient une liste de { product, quantity } 

// Enregistre le cartItems dans localStorage
const storeCartItems = (cartItems) => {
  const cart = cartItems.length > 0 ? cartItems : [];  
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Retourne un objet avec le nb d'items dans le panier + prix total du panier { itemCount: 0, total: 0 }
export const sumItems = cartItems => {
  storeCartItems(cartItems);                                                            // Enregistre le cart dans localStorage
  return {
    itemCount: cartItems.reduce((total, prod) => total + prod.quantity , 0),            // nb d'items dans le panier: parcours la liste et additionne les qty 
    total: cartItems.reduce((total, prod) => total + (prod.price * prod.quantity), 0)   // Prix total: parcours la liste et additionne le prix de produits
  }
}

// Élabore les fcts déclarées dans CartContext
const cartReducer = (state, action) => {
  // action.payload  = product
  // state est le Cart
  switch(action.type) {
    case 'ADD_ITEM':
      if (!state.cartItems.find(item => item.id === action.payload.id)) {               // Vérifie si l'item est dans la liste CartItems
        state.cartItems.push({ ...action.payload, quantity: 1 })                        // ajoute l'item à la liste CartItems
      }
      return { ...state, cartItems: [...state.cartItems], ...sumItems(state.cartItems) } // retourne le 'state' précédent + nouvelle liste CartItems + resultat de la fct sumItems
    
    case 'INCREASE':
      const productIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      state.cartItems[productIndex].quantity++;
      return { ...state, cartItems: [...state.cartItems], ...sumItems(state.cartItems), } // { fcts + cartItems + itemCount + total }

    case 'DECREASE':
      const productIdx = state.cartItems.findIndex(item => item.id === action.payload.id);
      const product = state.cartItems[productIdx];
      product.quantity = product.quantity > 1 ? product.quantity - 1 : 0;
      return { ...state, cartItems: [...state.cartItems], ...sumItems(state.cartItems) }
    
    case 'REMOVE_ITEM':
      const newCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      return { ...state, cartItems: [...newCartItems], ...sumItems(newCartItems) }
    
    case 'CLEAR':
      localStorage.removeItem('cart');
      return { cartItems: [], itemCount: 0, total: 0 }    

    default:
      return state;
  }
}

export default cartReducer;