// app/robots.js
// Tells search engines they may index the site, and where the sitemap is.

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.n2sboutique.com/sitemap.xml",
  };
}
