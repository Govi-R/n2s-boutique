// lib/products.js
//
// This file reads data/products.csv and turns it into JavaScript objects the
// rest of the site can use. It runs at BUILD time, not in the visitor's
// browser, which is why it is allowed to read files from disk.
//
// When you upgrade to version 2, this is the only file that changes: instead
// of reading a CSV it will query a database. Every page that uses these
// functions keeps working unchanged.

import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

// Fields that hold several values separated by a pipe character, for example
// "S|M|L" or "wedding|festival".
const MULTI_VALUE_FIELDS = ["occasion", "sizes", "image_urls"];

function splitMulti(value) {
  if (!value) return [];
  return value
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
}

// Turns one CSV row into a tidy product object.
function normaliseRow(row) {
  const product = {};

  for (const [key, rawValue] of Object.entries(row)) {
    const value = typeof rawValue === "string" ? rawValue.trim() : rawValue;

    if (MULTI_VALUE_FIELDS.includes(key)) {
      product[key] = splitMulti(value);
    } else {
      product[key] = value ?? "";
    }
  }

  // Convert the numeric columns from text into real numbers so we can sort
  // and compare them.
  product.price = Number(product.price) || 0;
  product.quantity = Number(product.quantity) || 0;

  // Convert the yes/no columns into true/false.
  product.one_of_a_kind = String(product.one_of_a_kind).toLowerCase() === "yes";
  product.featured = String(product.featured).toLowerCase() === "yes";

  // Convenience flags used all over the site.
  product.isAvailable = product.status === "available" && product.quantity > 0;
  product.isSoldOut = product.status === "sold_out" || product.quantity <= 0;
  product.mainImage = product.image_urls[0] || "";

  return product;
}

let cachedProducts = null;

// Reads every product from the CSV. Items with status "hidden" are excluded,
// so you can prepare rows in the spreadsheet before they go live.
export function getAllProducts() {
  if (cachedProducts) return cachedProducts;

  const csvPath = path.join(process.cwd(), "data", "products.csv");
  const csvText = fs.readFileSync(csvPath, "utf8");

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    console.warn("\nProblems found in data/products.csv:");
    for (const error of parsed.errors.slice(0, 10)) {
      console.warn(`  Row ${error.row}: ${error.message}`);
    }
    console.warn("Check data/SCHEMA.md for the expected format.\n");
  }

  const products = parsed.data
    .map(normaliseRow)
    .filter((product) => product.item_code && product.status !== "hidden");

  // Warn about missing alt text, which is a WCAG 2.1 AA requirement.
  const missingAlt = products.filter((p) => !p.alt_text).map((p) => p.item_code);
  if (missingAlt.length > 0) {
    console.warn(
      `\nMissing alt_text on ${missingAlt.length} item(s): ${missingAlt.slice(0, 10).join(", ")}` +
        `\nAlt text is required for accessibility. See data/SCHEMA.md.\n`
    );
  }

  cachedProducts = products;
  return products;
}

export function getProductByCode(itemCode) {
  return getAllProducts().find((product) => product.item_code === itemCode) || null;
}

export function getProductsByCategory(category) {
  return getAllProducts().filter((product) => product.category === category);
}

// Newest first, used for the "new arrivals" section on the homepage.
export function getNewArrivals(limit = 8) {
  return [...getAllProducts()]
    .sort((a, b) => String(b.date_added).localeCompare(String(a.date_added)))
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 6) {
  return getAllProducts()
    .filter((product) => product.featured)
    .slice(0, limit);
}

// Collects every distinct value used in the catalog, so the filter menus only
// ever offer options that actually match something.
export function getFilterOptions() {
  const products = getAllProducts();

  const collect = (getValues) => {
    const set = new Set();
    for (const product of products) {
      for (const value of getValues(product)) {
        if (value) set.add(value);
      }
    }
    return [...set].sort();
  };

  const prices = products.map((p) => p.price).filter((n) => n > 0);

  return {
    categories: collect((p) => [p.category]),
    subcategories: collect((p) => [p.subcategory]),
    occasions: collect((p) => p.occasion),
    colors: collect((p) => [p.color]),
    fabrics: collect((p) => [p.fabric]),
    sizes: collect((p) => p.sizes),
    priceMin: prices.length ? Math.min(...prices) : 0,
    priceMax: prices.length ? Math.max(...prices) : 0,
  };
}

// Display label helpers live in lib/labels.js because browser code needs them
// and must not import this file. Re-exported here so build-time code can get
// everything from one place.
export { humanise, CATEGORY_LABELS } from "./labels";
