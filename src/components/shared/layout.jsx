
// Wrapper utilisé pour incorporer le Header et Footer à un composant
// Utile pour permettre l'affichage du Header et Footer optionnel
import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
        <main>
          { children }
        </main>
      <Footer />
    </>
  );
}

export default Layout;