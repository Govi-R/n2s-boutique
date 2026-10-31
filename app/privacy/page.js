// app/privacy/page.js
//
// NOTE FOR THE OWNER: this is DRAFT wording only. It has not been reviewed by
// a lawyer and is not legal advice. Have it checked against a proper template
// or by an attorney before you publish the site, and update it if you ever
// start collecting anything beyond what is described below.

import Link from "next/link";
import { site } from "../../lib/site-config";

export const metadata = {
  title: "Privacy policy",
  description: "How N2S Boutique collects, uses and protects your information.",
};

function isSet(value) {
  return value && value !== "REPLACE_ME";
}

export default function PrivacyPage() {
  return (
    <div className="container section prose">
      <h1>Privacy policy</h1>

      <h2>What we collect</h2>
      <p>
        When you send an order request we collect your name, phone number and
        email address, along with the items you selected, your preferred
        collection method and any notes you add. We do not collect payment
        details, because no payment is taken on this website.
      </p>
      <p>
        We also use Google Analytics, which records anonymous information about
        how the website is used, such as which pages are viewed and whether a
        visitor arrived on a phone or a computer. This is not linked to your
        name or contact details.
      </p>

      <h2>Why we collect it</h2>
      <p>
        Your contact details are used only to confirm your order, arrange
        collection or delivery, and answer questions about that order. Analytics
        information is used only to understand which parts of the website are
        useful.
      </p>

      <h2>What we do not do</h2>
      <p>
        We do not sell, rent or share your information with anyone for marketing
        purposes. We do not add you to a mailing list without you asking.
      </p>

      <h2>Where your information goes</h2>
      <p>
        Order requests are sent to us by email through a form service, and are
        stored in our email account. Items you save or add to your cart are kept
        in your own web browser and are not sent to us until you submit the
        order form.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep order records for as long as needed to run the business and meet
        record-keeping requirements, and then delete them.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us what information we hold about you, ask us to correct it,
        or ask us to delete it. {isSet(site.email) ? (
          <>Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will
          take care of it.</>
        ) : (
          <>Get in touch through our <Link href="/contact/">contact page</Link> and
          we will take care of it.</>
        )}
      </p>

      <h2>Children</h2>
      <p>
        This website is intended for adults placing orders. We do not knowingly
        collect information from children.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes we will update this page.
      </p>
    </div>
  );
}
