// Store qui contient les infos de l'usagé 
// Le context est fourni à toute l'app
// Contient un Observer pour voir quand l'utilisateur login et enregistre son doc suite au login
import React, { useEffect, createContext, useState } from 'react';
import { auth, createUserProfileDocument } from '../firebase/index';    // librairie d'authentification de firebase + la fct CreateUser

export const UserContext = createContext();                             // Cré un simili-store



const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);                         // spinner

  useEffect(() => {                                                     // Exécuté lorsque le composant mount et [] à chaque action
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { // Observer pour connaitre les changement de connection de L'utilisateur.
      // Si l'usagé est SignIn
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);      // Obtient l'adresse du doc de l'usagé
        userRef.onSnapshot(snapShot => {                                // Obtient le doc et l'enregistre dans l'obj snapShot
          setUser({ id: snapShot.id, ...snapShot.data() });             // Extrait le doc de l'usagé
          setLoading(false);
        })
      // Si l'usagé n'est pas SignIn
      } else {
        setUser(userAuth);                                              // Assigne 'null' à la variable 'user'
        setLoading(false);
      }
    });
    return () => unsubscribeFromAuth();                                 // Se désabonne à l'observer lorsqu'on dismount
  }, []);


  const userContext = { user, loading };                                // Cré l'obj 'userContext'
  if (loading) { return <div>Loading...</div> }                         // Affiche 'loading...' pendant qu'on récupère les infos sur firebase
  
  // Section qui exporte userContext
  return (
    <UserContext.Provider value={userContext}>
      { children }
    </UserContext.Provider>
  );
}

export default UserContextProvider;