"use client";

// components/ProductCard.js
// One tile in a product grid. Has a save button, so it runs in the browser.

import Link from "next/link";
import { useStore, formatPrice } from "./StoreProvider";
import { humanise } from "../lib/labels";

export default function ProductCard({ product }) {
  const { isSaved, toggleSaved, ready } = useStore();
  const saved = ready && isSaved(product.item_code);

  return (
    <li className="card">
      <div className="card-image-wrap">
        <Link href={`/item/${product.item_code}/`}>
          {product.mainImage ? (
            <img
              src={product.mainImage}
              alt={product.alt_text || product.name}
              loading="lazy"
            />
          ) : (
            <span className="visually-hidden">No photograph available</span>
          )}
        </Link>

        {product.isSoldOut && (
          <span className="badge badge-soldout">Sold out</span>
        )}

        <button
          type="button"
          className="save-btn"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from saved items` : `Save ${product.name} for later`}
          onClick={() => toggleSaved(product)}
        >
          <span aria-hidden="true">{saved ? "♥" : "♡"}</span>
        </button>
      </div>

      <div className="card-body">
        <span className="card-code">{product.item_code}</span>
        <h3 className="card-name">
          <Link href={`/item/${product.item_code}/`}>{product.name}</Link>
        </h3>
        <span className="card-meta">
          {humanise(product.subcategory)}
          {product.color ? ` · ${humanise(product.color)}` : ""}
        </span>
        <span className="card-price">{formatPrice(product.price)}</span>
      </div>
    </li>
  );
}
