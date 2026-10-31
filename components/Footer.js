// components/Footer.js
// No clicking logic here, so this can be built once at build time.

import Link from "next/link";
import { site } from "../lib/site-config";

function isSet(value) {
  return value && value !== "REPLACE_ME";
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3>N2S Boutique</h3>
            <p style={{ marginTop: 0 }}>
              South Indian traditional wear for women, girls and children.
              Serving {site.serviceArea}.
            </p>
          </div>

          <div>
            <h3>Shop</h3>
            <ul>
              <li><Link href="/collections/">All collections</Link></li>
              <li><Link href="/category/women/">Women</Link></li>
              <li><Link href="/category/girl/">Girls</Link></li>
              <li><Link href="/saved/">Saved items</Link></li>
              <li><Link href="/cart/">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3>Information</h3>
            <ul>
              <li><Link href="/about/">About us</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
              <li><Link href="/policies/">Payment, pickup and returns</Link></li>
              <li><Link href="/privacy/">Privacy policy</Link></li>
            </ul>

            {(isSet(site.instagram) || isSet(site.facebook) || isSet(site.whatsappGroup)) && (
              <ul style={{ marginTop: "0.75rem" }}>
                {isSet(site.instagram) && (
                  <li><a href={site.instagram}>Instagram</a></li>
                )}
                {isSet(site.facebook) && (
                  <li><a href={site.facebook}>Facebook</a></li>
                )}
                {isSet(site.whatsappGroup) && (
                  <li><a href={site.whatsappGroup}>WhatsApp group</a></li>
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ margin: 0 }}>
            No payment is taken on this website. Orders are requests and are
            confirmed by us before they are final.
          </p>
          <p style={{ margin: "0.4rem 0 0" }}>
            © {new Date().getFullYear()} N2S Boutique. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
