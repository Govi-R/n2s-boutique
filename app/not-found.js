// app/not-found.js
// Shown when someone visits an address that does not exist, for example an
// item code that has been removed.

import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container section prose">
      <h1>We could not find that page</h1>
      <p>
        The item or page you were looking for may have been sold or moved. Most
        of our pieces are one of a kind, so items do come and go.
      </p>
      <p>
        <Link href="/collections/" className="btn">Browse the collection</Link>
      </p>
    </div>
  );
}
