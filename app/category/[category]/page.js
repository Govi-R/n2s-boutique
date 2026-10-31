// app/category/[category]/page.js
//
// One page per category. The square brackets in the folder name mean the
// address changes: /category/women/, /category/girl/ and so on.
//
// generateStaticParams below tells Next.js which pages to build. Without it,
// a site with no server would not know these addresses exist.

import { notFound } from "next/navigation";
import CatalogBrowser from "../../../components/CatalogBrowser";
import { getProductsByCategory, getFilterOptions } from "../../../lib/products";
import { CATEGORY_LABELS } from "../../../lib/labels";

const CATEGORIES = ["women", "men", "girl", "boy"];

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export function generateMetadata({ params }) {
  const label = CATEGORY_LABELS[params.category] || params.category;
  return {
    title: `${label}'s collection`,
    description: `South Indian traditional wear for ${label.toLowerCase()} at N2S Boutique, serving Prosper and Celina.`,
  };
}

export default function CategoryPage({ params }) {
  const { category } = params;
  if (!CATEGORIES.includes(category)) notFound();

  const products = getProductsByCategory(category);
  const label = CATEGORY_LABELS[category] || category;

  return (
    <div className="container section">
      {products.length === 0 ? (
        <>
          <h1>{label}&apos;s collection</h1>
          <div className="empty-state">
            <p style={{ margin: 0 }}>
              Nothing in this category yet. New pieces are added regularly.
            </p>
          </div>
        </>
      ) : (
        <CatalogBrowser
          products={products}
          filterOptions={getFilterOptions()}
          lockedCategory={category}
          heading={`${label}'s collection`}
        />
      )}
    </div>
  );
}
