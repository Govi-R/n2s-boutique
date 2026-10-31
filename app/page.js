// app/page.js
// The homepage. This runs at build time, reads the CSV, and produces plain HTML.

import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { getFeaturedProducts, getNewArrivals, getAllProducts } from "../lib/products";
import { site } from "../lib/site-config";

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const newArrivals = getNewArrivals(8);
  const total = getAllProducts().length;

  return (
    <>
      <section className="hero">
        <h1 style={{ marginBottom: "0.4rem" }}>N2S Boutique</h1>
        <p className="tagline">{site.tagline}</p>
        <div className="hero-links">
          <Link href="/collections/" className="btn">Browse all collections</Link>
          <Link href="/category/women/" className="btn btn-outline">Shop women</Link>
          <Link href="/category/girl/" className="btn btn-outline">Shop girls</Link>
        </div>
      </section>

      <div className="container">
        <div className="notice">
          <strong>How ordering works.</strong> Browse the collection, add pieces
          to your cart, and send us an order request. There is no payment on this
          website. We confirm availability {site.responseTime}, then arrange
          pickup or local delivery. Payment is made at that point by cash, Zelle
          or Venmo.
        </div>

        {featured.length > 0 && (
          <section className="section">
            <h2>Featured pieces</h2>
            <ul className="product-grid">
              {featured.map((product) => (
                <ProductCard key={product.item_code} product={product} />
              ))}
            </ul>
          </section>
        )}

        {newArrivals.length > 0 && (
          <section className="section">
            <h2>New arrivals</h2>
            <ul className="product-grid">
              {newArrivals.map((product) => (
                <ProductCard key={product.item_code} product={product} />
              ))}
            </ul>
            <p style={{ marginTop: "1.25rem" }}>
              <Link href="/collections/" className="btn btn-teal">
                See all {total} items
              </Link>
            </p>
          </section>
        )}

        {total === 0 && (
          <section className="section">
            <div className="empty-state">
              <p style={{ marginTop: 0 }}>
                The catalog is empty. Add rows to <code>data/products.csv</code> to
                see items appear here.
              </p>
              <p style={{ marginBottom: 0 }}>
                See <code>data/SCHEMA.md</code> for the column definitions.
              </p>
            </div>
          </section>
        )}

        <section className="section">
          <h2>Visiting us</h2>
          <p>
            N2S Boutique is a home-based boutique serving {site.serviceArea}.
            Pickup is by appointment, and we share the address once your order is
            confirmed. Local delivery is available with the cost confirmed after
            you order.
          </p>
          <p>
            <Link href="/contact/" className="btn btn-outline">Get in touch</Link>
          </p>
        </section>
      </div>
    </>
  );
}
