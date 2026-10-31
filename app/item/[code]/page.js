// app/item/[code]/page.js
//
// One page per product, built from the item_code column. This is why item_code
// must never change: it is part of the web address, so changing it breaks any
// link a customer has shared or bookmarked.

import { notFound } from "next/navigation";
import Link from "next/link";
import ItemDetail from "../../../components/ItemDetail";
import { getAllProducts, getProductByCode } from "../../../lib/products";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ code: product.item_code }));
}

export function generateMetadata({ params }) {
  const product = getProductByCode(params.code);
  if (!product) return { title: "Item not found" };

  return {
    title: product.name,
    description: product.description?.slice(0, 155),
  };
}

export default function ItemPage({ params }) {
  const product = getProductByCode(params.code);
  if (!product) notFound();

  return (
    <div className="container section">
      <p style={{ marginTop: 0, fontSize: "0.9rem" }}>
        <Link href="/collections/">All collections</Link>
      </p>
      <ItemDetail product={product} />
    </div>
  );
}
