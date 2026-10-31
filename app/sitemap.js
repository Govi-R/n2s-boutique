// app/sitemap.js
// Generates sitemap.xml automatically so Google can find every item page.

import { getAllProducts } from "../lib/products";

const BASE = "https://www.n2sboutique.com";

export default function sitemap() {
  const staticPaths = [
    "", "/collections", "/category/women", "/category/men",
    "/category/girl", "/category/boy", "/about", "/contact",
    "/policies", "/privacy",
  ];

  const pages = staticPaths.map((path) => ({
    url: `${BASE}${path}/`,
    lastModified: new Date(),
  }));

  const items = getAllProducts().map((product) => ({
    url: `${BASE}/item/${product.item_code}/`,
    lastModified: product.date_added || new Date(),
  }));

  return [...pages, ...items];
}
