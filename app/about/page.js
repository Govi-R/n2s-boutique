// app/about/page.js
import Link from "next/link";
import { site } from "../../lib/site-config";

export const metadata = {
  title: "About us",
  description:
    "N2S Boutique is a home-based boutique serving Prosper, Celina and the surrounding North Dallas area with South Indian traditional wear.",
};

export default function AboutPage() {
  return (
    <div className="container section prose">
      <h1>About N2S Boutique</h1>

      <p>
        N2S Boutique is a home-based boutique serving {site.serviceArea}. We
        offer South Indian traditional wear for women, girls and children,
        alongside a range of non-gold accessories.
      </p>

      <h2>What we stock</h2>
      <p>
        Our collection covers sarees, chudidhars, salwars, tops and other
        traditional wear, plus jewellery sets, earrings, nose rings and bangles.
        Most pieces are one of a kind, so once something is sold it is usually
        gone. New arrivals are added to the website regularly.
      </p>

      <h2>Shopping with us</h2>
      <p>
        Because we are a small local boutique, we keep things simple. Browse the
        collection, add what you like to your cart, and send us an order
        request. We confirm availability {site.responseTime}, then arrange a
        pickup appointment or local delivery.
      </p>
      <p>
        There is no payment on this website. You pay when you collect your
        order, by cash, Zelle or Venmo.
      </p>

      <h2>Where we are</h2>
      <p>
        We are based in the Prosper and Celina area and pickup is by
        appointment. We share our address once your order is confirmed, which
        keeps things straightforward for a home-based business. Local delivery
        is available and the cost is confirmed after you order, depending on
        distance and availability.
      </p>

      <p>
        <Link href="/collections/" className="btn">Browse the collection</Link>
      </p>
    </div>
  );
}
