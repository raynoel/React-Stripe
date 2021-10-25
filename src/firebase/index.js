// Nous utiliserons firebase pour héberger la DB contenant nos uusagés et pour authoriser l'accès aux différents fichiers
// >>> npm isntall firebase
import firebase from 'firebase/app';                            // Obtient la librairie de base pour se connecter avec firebase
import 'firebase/firestore';                                    // Obtient la librairie pour communiquer avec la DB
import 'firebase/auth';                                         // Obtient la librairie pour communiquer avec auth

// Connecte avec firebase avec notre clé API
const config = {
  apiKey: "AIzaSyBO0xQ0qlSFtk7qcqSHNu5k2aN_oB03JXI",
  authDomain: "nomad-bags-store-583b7.firebaseapp.com",
  projectId: "nomad-bags-store-583b7",
  storageBucket: "nomad-bags-store-583b7.appspot.com",
  messagingSenderId: "951922512801",
  appId: "1:951922512801:web:b5486681f1afa65aa3b1e0"
};
firebase.initializeApp(config);


const firestore = firebase.firestore();                         // Cré une référence pour la db
const auth = firebase.auth();                                   // Cré une référence pour auth. On utilisera userContext pour passer les authorisations de l'usagé entre les composants

// Fct utilisée lors du SignUp et qui construit un doc contenant le profil de l'usagé sur firestore
// SignUp aura déjà vérifié si U/P est valide dans firestore. Cette fct de validation retourne l'obj 'user' qui est désigné ici par userAuth. 'additionalData' contient un objet avec les infos supplémentaires qu'on veut enregistrer sur firestore... ici ce sera 'displayName'
// Cré un doc pour un nouvel usagé
// Retourne l'adresse du doc de l'usagé
const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) { return }

  const userRef = firestore.doc(`users/${userAuth.uid}`);       // Adresse du doc où est enregistré les infos de l'usagé
  const snapShot = await userRef.get();                         // Obtient le doc 

  // Cré un doc pour un nouvel usagé
  if (!snapShot.exists) {     
    const { displayName, email } = userAuth;                    // Extrait 'firstName' et 'email' utilisé lors du SignUp
    const createdAt = new Date();
    try {
      await userRef.set({                                       // Cré un doc
        displayName,
        email,
        createdAt,
        ...additionalData 
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;                                               // Retourne l'addresse du doc de l'usagé
}



export { firestore, createUserProfileDocument, auth }