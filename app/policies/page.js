// app/policies/page.js
//
// NOTE FOR THE OWNER: this wording is a draft. Have it reviewed against a
// proper template, or by an attorney, before you rely on it. It is not legal
// advice.

import Link from "next/link";
import { site } from "../../lib/site-config";

export const metadata = {
  title: "Payment, pickup and returns",
  description:
    "How ordering, payment, pickup, delivery and returns work at N2S Boutique.",
};

export default function PoliciesPage() {
  return (
    <div className="container section prose">
      <h1>Payment, pickup and returns</h1>

      <h2>How ordering works</h2>
      <p>
        Submitting the order form on this website sends us an order request. It
        is a request, not a completed sale. We check that each piece is still
        available, then contact you to confirm and arrange collection or
        delivery. Prices are subject to change until an order is confirmed.
      </p>

      <h2>Payment</h2>
      <p>
        No payment is taken on this website. Payment is made when you collect
        your order, or when it is delivered, by cash, Zelle or Venmo. We do not
        accept card payments at this time.
      </p>

      <h2>Pickup</h2>
      <p>
        Pickup is by appointment. We are a home-based boutique, so we share our
        address once your order is confirmed rather than publishing it here.
      </p>

      <h2>Delivery</h2>
      <p>
        Local delivery is available. The cost is confirmed after you order and
        depends on distance and availability. We do not ship outside the local
        area.
      </p>

      <h2>Returns and exchanges</h2>
      <p>
        All sales are final. N2S Boutique does not accept returns or exchanges
        on any item once sold. Please review item details, size and photographs
        carefully before submitting your order, and{" "}
        <Link href="/contact/">contact us</Link> with any questions before you
        order. We are always happy to answer questions about fit, fabric or
        colour beforehand.
      </p>

      <h2>Availability</h2>
      <p>
        Most of our pieces are one of a kind. We do our best to keep the website
        current, but if something sells before we can update it we will let you
        know {site.responseTime} and help you find an alternative.
      </p>
    </div>
  );
}
