'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

// Cart is kept in the browser (localStorage) until the customer checks out.
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem('cart') || '[]'));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem('cart', JSON.stringify(items));
  }, [items, loaded]);

  const add = (p) =>
    setItems((cur) => {
      const found = cur.find((i) => i.id === p.id);
      if (found) return cur.map((i) => (i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...cur, { id: p.id, name: p.name, price_cents: p.price_cents, emoji: p.emoji, image_url: p.image_url, quantity: 1 }];
    });
  const setQty = (id, quantity) =>
    setItems((cur) =>
      quantity <= 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  const clear = () => setItems([]);
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const total = items.reduce((n, i) => n + i.quantity * i.price_cents, 0);

  return (
    <CartContext.Provider value={{ items, add, setQty, clear, count, total, loaded }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
