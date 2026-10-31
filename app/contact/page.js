// app/contact/page.js
import Link from "next/link";
import { site } from "../../lib/site-config";

export const metadata = {
  title: "Contact us",
  description:
    "Get in touch with N2S Boutique by phone, email or WhatsApp. Serving Prosper, Celina and the surrounding area.",
};

function isSet(value) {
  return value && value !== "REPLACE_ME";
}

export default function ContactPage() {
  return (
    <div className="container section prose">
      <h1>Contact us</h1>

      <p>
        For questions about an item, sizing, availability or an existing order,
        reach out any of these ways. We usually reply {site.responseTime}.
      </p>

      <h2>Get in touch</h2>
      <ul>
        {isSet(site.phone) && (
          <li>
            Phone or text: <a href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}>{site.phone}</a>
          </li>
        )}
        {isSet(site.email) && (
          <li>
            Email: <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
        )}
        {isSet(site.whatsappGroup) && (
          <li>
            <a href={site.whatsappGroup}>Join our WhatsApp group</a> for new
            arrivals and updates
          </li>
        )}
        {isSet(site.instagram) && (
          <li>
            <a href={site.instagram}>Instagram</a>
          </li>
        )}
        {isSet(site.facebook) && (
          <li>
            <a href={site.facebook}>Facebook</a>
          </li>
        )}
      </ul>

      <h2>Placing an order</h2>
      <p>
        The quickest way to order is through the website. Add items to your
        cart and send an order request, and we will confirm availability and
        arrange pickup or delivery.
      </p>
      <p>
        <Link href="/collections/" className="btn">Browse the collection</Link>
      </p>

      <h2>Where we are</h2>
      <p>
        We are a home-based boutique serving {site.serviceArea}. Pickup is by
        appointment and we share the address once your order is confirmed.
      </p>
    </div>
  );
}
