import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Cart from './components/Cart';
import apiService from './services/api';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    
    // Notification simple
    alert(`${product.name} ajouté au panier !`);
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleCheckout = async (orderData) => {
    try {
      // Envoyer les données au backend Django
      console.log('Données de commande:', orderData);
      
      const response = await apiService.createOrder(orderData);
      
      if (response) {
        alert('Commande enregistrée avec succès ! Nous vous contacterons bientôt.');
        setCartItems([]);
        setIsCartOpen(false);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'enregistrement de la commande. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItems={cartItems}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        <Hero />
        <Products onAddToCart={addToCart} />
        <About />
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;

