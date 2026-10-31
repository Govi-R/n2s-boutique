/** @type {import('next').NextConfig} */

// This tells Next.js to produce plain HTML, CSS and JavaScript files instead of
// running a server. GitHub Pages can only serve plain files, which is why this
// setting is required.
//
// When you move to version 2 (admin panel, database, inventory holds), you will
// delete the "output" and "images" lines below and deploy to a host that can run
// server code. Nothing else in the project needs to change.

const nextConfig = {
  output: "export",

  // Next.js normally optimises images on a server. There is no server here,
  // so image optimisation is switched off and images load directly from the
  // image host URLs in products.csv.
  images: {
    unoptimized: true,
  },

  // Produces /collections/index.html instead of /collections.html, which is
  // what GitHub Pages expects for clean URLs.
  trailingSlash: true,
};

export default nextConfig;
