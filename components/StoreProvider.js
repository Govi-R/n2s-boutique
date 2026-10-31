"use client";

// components/StoreProvider.js
//
// Holds the cart and the saved-items list. "use client" at the top tells
// Next.js this code runs in the visitor's browser rather than at build time,
// which it must, because it reacts to clicks.
//
// The data is kept in localStorage, a small storage area inside the visitor's
// own browser. Nothing is sent anywhere until they submit the order form.
// That is why no account is needed.

import { createContext, useContext, useEffect, useState } from "react";

const CART_KEY = "n2s_cart_v1";
const SAVED_KEY = "n2s_saved_v1";

const StoreContext = createContext(null);

function readStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be full or blocked in private browsing. Failing quietly is
    // correct here: the visitor can still browse and order.
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);

  // Load whatever was stored last time, once, after the page appears.
  useEffect(() => {
    setCart(readStorage(CART_KEY, []));
    setSaved(readStorage(SAVED_KEY, []));
    setReady(true);
  }, []);

  // Save back to the browser whenever either list changes.
  useEffect(() => {
    if (ready) writeStorage(CART_KEY, cart);
  }, [cart, ready]);

  useEffect(() => {
    if (ready) writeStorage(SAVED_KEY, saved);
  }, [saved, ready]);

  function addToCart(product, size) {
    setCart((current) => {
      const existing = current.find(
        (line) => line.item_code === product.item_code && line.size === size
      );

      // One-of-a-kind items can only ever be ordered once.
      if (existing && product.one_of_a_kind) return current;

      if (existing) {
        return current.map((line) =>
          line === existing
            ? { ...line, quantity: Math.min(line.quantity + 1, product.quantity) }
            : line
        );
      }

      return [
        ...current,
        {
          item_code: product.item_code,
          name: product.name,
          price: product.price,
          size: size || "",
          image: product.mainImage,
          alt: product.alt_text,
          maxQuantity: product.one_of_a_kind ? 1 : product.quantity,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(itemCode, size) {
    setCart((current) =>
      current.filter((line) => !(line.item_code === itemCode && line.size === size))
    );
  }

  function setLineQuantity(itemCode, size, quantity) {
    setCart((current) =>
      current.map((line) => {
        if (line.item_code !== itemCode || line.size !== size) return line;
        const capped = Math.max(1, Math.min(quantity, line.maxQuantity || 1));
        return { ...line, quantity: capped };
      })
    );
  }

  function clearCart() {
    setCart([]);
  }

  function toggleSaved(product) {
    setSaved((current) => {
      const exists = current.some((item) => item.item_code === product.item_code);
      if (exists) {
        return current.filter((item) => item.item_code !== product.item_code);
      }
      return [
        ...current,
        {
          item_code: product.item_code,
          name: product.name,
          price: product.price,
          image: product.mainImage,
          alt: product.alt_text,
        },
      ];
    });
  }

  function isSaved(itemCode) {
    return saved.some((item) => item.item_code === itemCode);
  }

  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const cartTotal = cart.reduce((total, line) => total + line.price * line.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        saved,
        ready,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        setLineQuantity,
        clearCart,
        toggleSaved,
        isSaved,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}

export function formatPrice(amount) {
  return "$" + Number(amount).toLocaleString("en-US");
}
