// lib/labels.js
//
// Small helpers for turning stored values into readable labels.
//
// These live in their own file, separate from lib/products.js, for an
// important reason: lib/products.js reads the CSV file from disk, and reading
// files is something only build-time code can do. Anything that runs in the
// visitor's browser must not import it, or the build fails.
//
// This file touches no files, so browser code can safely use it.

// "jewellery-set" becomes "Jewellery Set"
export function humanise(value) {
  if (!value) return "";
  return String(value)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const CATEGORY_LABELS = {
  women: "Women",
  men: "Men",
  girl: "Girls",
  boy: "Boys",
};
