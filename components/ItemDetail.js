"use client";

// components/ItemDetail.js
// The photo gallery, size buttons and add-to-cart button all respond to
// clicks, so this runs in the browser.

import { useState } from "react";
import Link from "next/link";
import { useStore, formatPrice } from "./StoreProvider";
import { humanise, CATEGORY_LABELS } from "../lib/labels";

export default function ItemDetail({ product }) {
  const { addToCart, isSaved, toggleSaved, ready } = useStore();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.length === 1 ? product.sizes[0] : ""
  );
  const [added, setAdded] = useState(false);

  const saved = ready && isSaved(product.item_code);
  const needsSize = product.sizes.length > 1;
  const canAdd = product.isAvailable && (!needsSize || selectedSize);

  function handleAdd() {
    if (!canAdd) return;
    addToCart(product, selectedSize || product.sizes[0] || "");
    setAdded(true);
  }

  return (
    <div className="item-layout">
      <div>
        <div className="gallery-main">
          {product.image_urls.length > 0 ? (
            <img
              src={product.image_urls[activeImage]}
              alt={product.alt_text || product.name}
            />
          ) : (
            <p style={{ padding: "1rem" }}>No photograph available yet.</p>
          )}
        </div>

        {product.image_urls.length > 1 && (
          <div className="thumb-row">
            {product.image_urls.map((url, index) => (
              <button
                key={url}
                type="button"
                aria-current={index === activeImage}
                aria-label={`View photograph ${index + 1} of ${product.image_urls.length}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={url} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="card-code" style={{ margin: 0 }}>{product.item_code}</p>
        <h1 style={{ marginTop: "0.2rem" }}>{product.name}</h1>
        <p className="price-large">{formatPrice(product.price)}</p>

        {product.isSoldOut && (
          <div className="notice notice-warn">
            <strong>Sold out.</strong> This piece is no longer available. Browse{" "}
            <Link href="/collections/">the rest of the collection</Link> for something similar.
          </div>
        )}

        <p>{product.description}</p>

        {needsSize && (
          <>
            <h2 style={{ fontSize: "0.95rem", fontFamily: "var(--font-body)", marginBottom: 0 }}>
              Select a size <span className="required-mark">*</span>
            </h2>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="action-row">
          <button
            type="button"
            className="btn"
            onClick={handleAdd}
            disabled={!canAdd}
          >
            {product.isSoldOut
              ? "Sold out"
              : needsSize && !selectedSize
              ? "Choose a size first"
              : "Add to cart"}
          </button>

          <button
            type="button"
            className="btn btn-outline"
            aria-pressed={saved}
            onClick={() => toggleSaved(product)}
          >
            {saved ? "Saved ♥" : "Save for later ♡"}
          </button>
        </div>

        {added && (
          <div className="notice" role="status">
            <strong>Added to your cart.</strong>{" "}
            <Link href="/cart/">Go to cart</Link> or keep browsing.
          </div>
        )}

        <table className="spec-table">
          <caption className="visually-hidden">Item details</caption>
          <tbody>
            <tr>
              <th scope="row">Item code</th>
              <td>{product.item_code}</td>
            </tr>
            <tr>
              <th scope="row">Category</th>
              <td>{CATEGORY_LABELS[product.category] || humanise(product.category)}</td>
            </tr>
            <tr>
              <th scope="row">Type</th>
              <td>{humanise(product.subcategory)}</td>
            </tr>
            {product.sizes.length > 0 && (
              <tr>
                <th scope="row">Available sizes</th>
                <td>{product.sizes.map((s) => s.toUpperCase()).join(", ")}</td>
              </tr>
            )}
            {product.color && (
              <tr>
                <th scope="row">Colour</th>
                <td>{humanise(product.color)}</td>
              </tr>
            )}
            {product.fabric && (
              <tr>
                <th scope="row">Fabric</th>
                <td>{humanise(product.fabric)}</td>
              </tr>
            )}
            {product.occasion.length > 0 && (
              <tr>
                <th scope="row">Occasion</th>
                <td>{product.occasion.map(humanise).join(", ")}</td>
              </tr>
            )}
            {product.care_instructions && (
              <tr>
                <th scope="row">Care</th>
                <td>{product.care_instructions}</td>
              </tr>
            )}
            <tr>
              <th scope="row">Availability</th>
              <td>{product.isAvailable ? "Available" : "Sold out"}</td>
            </tr>
          </tbody>
        </table>

        <div className="notice">
          <strong>No payment is taken online.</strong> Add items to your cart and
          send us an order request. We confirm availability, then arrange pickup
          or local delivery. Payment is made at that point by cash, Zelle or Venmo.
        </div>
      </div>
    </div>
  );
}
