import React, { createContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import productsData from '../data/products.json';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products] = useState(productsData);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('amaira_cart');
    return saved ? JSON.parse(saved) : {};
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('amaira_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('amaira_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('amaira_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Currency Formatter
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const addToCart = (productId, quantity = 1) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity,
    }));
    
    // Fun celebration blast!
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#EDE9FF', '#FFB30E']
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prev) => ({
        ...prev,
        [productId]: quantity,
      }));
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);
  };

  const getCartSubtotal = () => {
    return Object.entries(cartItems).reduce((acc, [id, qty]) => {
      const product = products.find((p) => p.id === parseInt(id));
      return acc + (product ? product.price * qty : 0);
    }, 0);
  };

  const cart = Object.entries(cartItems).map(([id, quantity]) => ({
    id: parseInt(id),
    quantity,
  }));

  const clearCart = () => {
    setCartItems({});
  };

  const value = {
    products,
    cartItems,
    cart,
    wishlist,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    getCartCount,
    getCartTotal: getCartSubtotal,
    getCartSubtotal,
    clearCart,
    formatPrice
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};
