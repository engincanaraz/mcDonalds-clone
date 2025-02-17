import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, options = {}) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.id === product.id && 
          JSON.stringify(item.options) === JSON.stringify(options)
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      }

      return [...prevItems, {
        ...product,
        options,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (productId, options = {}) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === productId && 
          JSON.stringify(item.options) === JSON.stringify(options))
      )
    );
  };

  const updateQuantity = (productId, options = {}, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, options);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId && 
        JSON.stringify(item.options) === JSON.stringify(options)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      let itemTotal = item.price * item.quantity;
      
      // Opsiyonel ürünlerin fiyatlarını ekle
      if (item.options) {
        if (item.options.drink && item.options.drink.additionalPrice) {
          itemTotal += item.options.drink.additionalPrice;
        }
        if (item.options.sauce && item.options.sauce.additionalPrice) {
          itemTotal += item.options.sauce.additionalPrice;
        }
        if (item.options.dessertPromo && item.options.dessertPromo.additionalPrice) {
          itemTotal += item.options.dessertPromo.additionalPrice;
        }
      }
      
      return total + itemTotal;
    }, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 