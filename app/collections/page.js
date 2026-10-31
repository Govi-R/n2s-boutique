// app/collections/page.js
// The full catalog. Product data and the filter options are worked out at build
// time, then handed to CatalogBrowser which does the searching in the browser.

import CatalogBrowser from "../../components/CatalogBrowser";
import { getAllProducts, getFilterOptions } from "../../lib/products";

export const metadata = {
  title: "All collections",
  description:
    "Browse the full N2S Boutique collection of sarees, chudidhars, salwars, tops and accessories for women and girls.",
};

export default function CollectionsPage() {
  return (
    <div className="container section">
      <CatalogBrowser
        products={getAllProducts()}
        filterOptions={getFilterOptions()}
        heading="All collections"
      />
    </div>
  );
}
