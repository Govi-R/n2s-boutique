"use client";

// components/SavedView.js
// Items the visitor kept for later. Held separately from the cart, so saving
// something never places an order.

import Link from "next/link";
import { useStore, formatPrice } from "./StoreProvider";

export default function SavedView() {
  const { saved, ready, toggleSaved } = useStore();

  if (!ready) return <p>Loading your saved items…</p>;

  if (saved.length === 0) {
    return (
      <div className="prose">
        <h1>Saved items</h1>
        <div className="empty-state">
          <p style={{ marginTop: 0 }}>
            You have not saved anything yet. Tap the heart on any item to keep it here.
          </p>
          <Link href="/collections/" className="btn">Browse the collection</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1>Saved items</h1>
      <p style={{ color: "var(--muted)" }}>
        Saved items are kept in this browser only. They are not an order and
        nothing is reserved.
      </p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: "44rem" }}>
        {saved.map((item) => (
          <li className="cart-line" key={item.item_code}>
            {item.image ? (
              <img src={item.image} alt={item.alt || item.name} />
            ) : (
              <div style={{ width: 76, height: 100, background: "var(--cream)" }} />
            )}
            <div>
              <span className="card-code">{item.item_code}</span>
              <p style={{ margin: "0.1rem 0 0.2rem", fontWeight: 600 }}>
                <Link href={`/item/${item.item_code}/`}>{item.name}</Link>
              </p>
              <p style={{ margin: 0, color: "var(--red)", fontWeight: 700 }}>
                {formatPrice(item.price)}
              </p>
              <div className="cart-line-actions">
                <Link href={`/item/${item.item_code}/`} className="link-button">
                  View item
                </Link>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => toggleSaved({ item_code: item.item_code })}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
