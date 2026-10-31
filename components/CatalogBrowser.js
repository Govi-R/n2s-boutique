"use client";

// components/CatalogBrowser.js
//
// The full product list is baked into the page when the site is built, and all
// searching and filtering happens instantly in the visitor's browser. That is
// why the site needs no server and no database in version 1.
//
// On phones the filter panel is hidden behind a button. On screens 900px and
// wider it becomes a permanent sidebar. That rule lives in globals.css.

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { humanise, CATEGORY_LABELS } from "../lib/labels";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A to Z" },
];

// A group of tick boxes, for example every colour in the catalog.
function CheckboxGroup({ title, options, selected, onToggle, labelFor }) {
  if (options.length === 0) return null;

  return (
    <fieldset className="filter-group" style={{ border: "none", margin: 0, padding: 0 }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {options.map((option) => (
        <label className="checkbox-row" key={option}>
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
          />
          <span>{labelFor ? labelFor(option) : humanise(option)}</span>
        </label>
      ))}
    </fieldset>
  );
}

export default function CatalogBrowser({
  products,
  filterOptions,
  lockedCategory = null,
  heading,
}) {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [colors, setColors] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(filterOptions.priceMax);
  const [hideSoldOut, setHideSoldOut] = useState(false);
  const [sort, setSort] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Adds a value if it is not selected, removes it if it is.
  function makeToggler(setter) {
    return (value) =>
      setter((current) =>
        current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value]
      );
  }

  function clearAll() {
    setQuery("");
    setCategories([]);
    setSubcategories([]);
    setOccasions([]);
    setColors([]);
    setFabrics([]);
    setSizes([]);
    setMaxPrice(filterOptions.priceMax);
    setHideSoldOut(false);
  }

  const visible = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    // A filter list that is empty means "no restriction".
    const matchesAny = (selected, values) =>
      selected.length === 0 || values.some((value) => selected.includes(value));

    let result = products.filter((product) => {
      if (words.length > 0) {
        const haystack = [
          product.name,
          product.item_code,
          product.description,
          product.color,
          product.fabric,
          product.subcategory,
        ]
          .join(" ")
          .toLowerCase();

        // Every word typed must appear somewhere.
        if (!words.every((word) => haystack.includes(word))) return false;
      }

      if (!matchesAny(categories, [product.category])) return false;
      if (!matchesAny(subcategories, [product.subcategory])) return false;
      if (!matchesAny(occasions, product.occasion)) return false;
      if (!matchesAny(colors, [product.color])) return false;
      if (!matchesAny(fabrics, [product.fabric])) return false;
      if (!matchesAny(sizes, product.sizes)) return false;
      if (product.price > maxPrice) return false;
      if (hideSoldOut && product.isSoldOut) return false;

      return true;
    });

    result = [...result].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return String(b.date_added).localeCompare(String(a.date_added));
    });

    return result;
  }, [
    products, query, categories, subcategories, occasions,
    colors, fabrics, sizes, maxPrice, hideSoldOut, sort,
  ]);

  // True when the slider is at the top of its range, meaning no price limit.
  const atMaxPrice = maxPrice >= filterOptions.priceMax;

  const activeFilterCount =
    categories.length + subcategories.length + occasions.length +
    colors.length + fabrics.length + sizes.length +
    (hideSoldOut ? 1 : 0) +
    (atMaxPrice ? 0 : 1);

  return (
    <div className="catalog">
      <div>
        <button
          type="button"
          className="btn btn-outline filter-toggle"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
        >
          {filtersOpen ? "Hide filters" : "Show filters"}
          {activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
        </button>

        <div className={filtersOpen ? "filters open" : "filters"}>
          {/* The slider runs from $1 to the most expensive item in the
              catalog, in $1 steps. At the top end it reads "Max" rather than a
              figure, because at that position nothing is being filtered out
              and a number there would wrongly suggest a price cap. */}
          {filterOptions.priceMax > 1 && (
            <div className="filter-group">
              <h3 style={{ marginTop: 0 }}>Price</h3>
              <label htmlFor="maxPrice" style={{ fontSize: "0.85rem" }}>
                Up to{" "}
                {atMaxPrice ? "Max" : `$${Number(maxPrice).toLocaleString("en-US")}`}
              </label>
              <input
                id="maxPrice"
                type="range"
                min={1}
                max={filterOptions.priceMax}
                step={1}
                /* Screen readers announce this instead of the raw number, so
                   they match what is shown on screen. */
                aria-valuetext={
                  atMaxPrice
                    ? "Max, no price limit"
                    : `Up to $${Number(maxPrice).toLocaleString("en-US")}`
                }
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
            </div>
          )}

          {!lockedCategory && (
            <CheckboxGroup
              title="Category"
              options={filterOptions.categories}
              selected={categories}
              onToggle={makeToggler(setCategories)}
              labelFor={(value) => CATEGORY_LABELS[value] || humanise(value)}
            />
          )}

          <CheckboxGroup
            title="Type"
            options={filterOptions.subcategories}
            selected={subcategories}
            onToggle={makeToggler(setSubcategories)}
          />
          <CheckboxGroup
            title="Occasion"
            options={filterOptions.occasions}
            selected={occasions}
            onToggle={makeToggler(setOccasions)}
          />
          <CheckboxGroup
            title="Size"
            options={filterOptions.sizes}
            selected={sizes}
            onToggle={makeToggler(setSizes)}
          />
          <CheckboxGroup
            title="Colour"
            options={filterOptions.colors}
            selected={colors}
            onToggle={makeToggler(setColors)}
          />
          <CheckboxGroup
            title="Fabric"
            options={filterOptions.fabrics}
            selected={fabrics}
            onToggle={makeToggler(setFabrics)}
          />

          <div className="filter-group">
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={hideSoldOut}
                onChange={() => setHideSoldOut((value) => !value)}
              />
              <span>Hide sold out items</span>
            </label>
            <button type="button" className="link-button" onClick={clearAll}>
              Clear all filters
            </button>
          </div>
        </div>
      </div>

      <div>
        {heading && <h1>{heading}</h1>}

        <div className="search-row">
          <label htmlFor="catalogSearch" className="visually-hidden">
            Search the collection
          </label>
          <input
            id="catalogSearch"
            type="text"
            placeholder="Search sarees, colours, item codes…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="toolbar">
          {/* aria-live tells screen readers to announce the new count when
              filters change. */}
          <span aria-live="polite">
            {visible.length} {visible.length === 1 ? "item" : "items"}
          </span>

          <span>
            <label htmlFor="sortBy" style={{ marginRight: "0.4rem" }}>Sort</label>
            <select
              id="sortBy"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </span>
        </div>

        {visible.length === 0 ? (
          <div className="empty-state">
            <p style={{ marginTop: 0 }}>
              Nothing matches those choices yet.
            </p>
            <button type="button" className="btn btn-outline" onClick={clearAll}>
              Clear all filters
            </button>
          </div>
        ) : (
          <ul className="product-grid">
            {visible.map((product) => (
              <ProductCard key={product.item_code} product={product} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}