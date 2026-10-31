"use client";

// components/Header.js
// The cart and saved counts change as the visitor clicks, so this runs in the
// browser ("use client") rather than being fixed at build time.

import Link from "next/link";
import { useStore } from "./StoreProvider";
import { site } from "../lib/site-config";

export default function Header() {
  const { cartCount, saved, ready } = useStore();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="" width="44" height="44" />
          <span>
            N2S Boutique
            <span className="tag">{site.tagline}</span>
          </span>
        </Link>

        <div className="header-actions">
          <Link href="/saved/" className="icon-link">
            <span aria-hidden="true">♡</span>
            <span>Saved</span>
            {ready && saved.length > 0 && (
              <span className="count-badge">{saved.length}</span>
            )}
          </Link>

          <Link href="/cart/" className="icon-link">
            <span aria-hidden="true">🛍</span>
            <span>Cart</span>
            {ready && cartCount > 0 && (
              <span className="count-badge">{cartCount}</span>
            )}
            <span className="visually-hidden">
              {ready ? `${cartCount} item${cartCount === 1 ? "" : "s"} in cart` : ""}
            </span>
          </Link>
        </div>
      </div>

      <nav className="main-nav" aria-label="Main">
        <ul>
          <li><Link href="/collections/">All Collections</Link></li>
          <li><Link href="/category/women/">Women</Link></li>
          <li><Link href="/category/men/">Men</Link></li>
          <li><Link href="/category/girl/">Girls</Link></li>
          <li><Link href="/category/boy/">Boys</Link></li>
          <li><Link href="/about/">About</Link></li>
          <li><Link href="/contact/">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
