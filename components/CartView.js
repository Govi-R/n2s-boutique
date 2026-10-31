"use client";

// components/CartView.js
//
// The cart and the order request form. When submitted, the form is sent to
// Formspree, a hosted service that emails the contents to the boutique owner.
// Formspree is used because GitHub Pages cannot send email itself.
//
// No payment details are collected here, by design.

import { useState } from "react";
import Link from "next/link";
import { useStore, formatPrice } from "./StoreProvider";
import { site } from "../lib/site-config";

export default function CartView() {
  const { cart, cartTotal, ready, removeFromCart, setLineQuantity, clearCart } = useStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("pickup");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  const formConfigured = site.formspreeId && site.formspreeId !== "REPLACE_ME";

  async function handleSubmit(event) {
    event.preventDefault();
    if (cart.length === 0) return;

    if (!formConfigured) {
      setStatus("error");
      setErrorMessage(
        "The order form is not connected yet. Set formspreeId in lib/site-config.js."
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    // A plain text summary of the order, which is what arrives in the email.
    const orderLines = cart
      .map(
        (line) =>
          `${line.item_code}  ${line.name}` +
          (line.size ? `  size ${line.size.toUpperCase()}` : "") +
          `  qty ${line.quantity}  ${formatPrice(line.price * line.quantity)}`
      )
      .join("\n");

    try {
      const response = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New order request from ${name}`,
          customer_name: name,
          customer_phone: phone,
          customer_email: email,
          fulfilment_method: method,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          notes,
          order_items: orderLines,
          item_count: cart.reduce((total, line) => total + line.quantity, 0),
          order_total: formatPrice(cartTotal),
        }),
      });

      if (!response.ok) throw new Error("Formspree rejected the submission");

      setStatus("sent");
      clearCart();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending your request. Please try again, or contact us directly."
      );
    }
  }

  // Nothing is shown until the browser has loaded the stored cart, otherwise
  // the page would flash "empty" for a moment.
  if (!ready) {
    return <p>Loading your cart…</p>;
  }

  if (status === "sent") {
    return (
      <div className="prose">
        <h1>Order request received</h1>
        <div className="notice">
          <strong>Thank you.</strong> We have your request and will confirm
          availability {site.responseTime}.
        </div>
        <p>
          Please note that this is a request rather than a completed sale. We
          check each piece is still available, then contact you to arrange
          pickup or local delivery and confirm the total.
        </p>
        <p>
          Payment is made at pickup or delivery by cash, Zelle or Venmo. The
          pickup address is shared once your order is confirmed.
        </p>
        <p>
          <Link href="/collections/" className="btn">Continue browsing</Link>
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="prose">
        <h1>Your cart</h1>
        <div className="empty-state">
          <p style={{ marginTop: 0 }}>Your cart is empty.</p>
          <Link href="/collections/" className="btn">Browse the collection</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1>Your cart</h1>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: "44rem" }}>
        {cart.map((line) => (
          <li className="cart-line" key={`${line.item_code}-${line.size}`}>
            {line.image ? (
              <img src={line.image} alt={line.alt || line.name} />
            ) : (
              <div style={{ width: 76, height: 100, background: "var(--cream)" }} />
            )}

            <div>
              <span className="card-code">{line.item_code}</span>
              <p style={{ margin: "0.1rem 0 0.2rem", fontWeight: 600 }}>{line.name}</p>
              {line.size && (
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)" }}>
                  Size {line.size.toUpperCase()}
                </p>
              )}
              <p style={{ margin: "0.2rem 0 0", color: "var(--red)", fontWeight: 700 }}>
                {formatPrice(line.price * line.quantity)}
              </p>

              <div className="cart-line-actions">
                {line.maxQuantity > 1 ? (
                  <span className="qty-control">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${line.name}`}
                      onClick={() =>
                        setLineQuantity(line.item_code, line.size, line.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span aria-live="polite">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${line.name}`}
                      onClick={() =>
                        setLineQuantity(line.item_code, line.size, line.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </span>
                ) : (
                  <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                    One of a kind
                  </span>
                )}

                <button
                  type="button"
                  className="link-button"
                  onClick={() => removeFromCart(line.item_code, line.size)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-total" style={{ maxWidth: "44rem" }}>
        <span>Total</span>
        <span className="amount">{formatPrice(cartTotal)}</span>
      </div>

      <div className="notice" style={{ maxWidth: "44rem" }}>
        <strong>No payment is taken on this website.</strong> Submitting this
        form sends us an order request. We confirm availability{" "}
        {site.responseTime}, then arrange pickup or local delivery. Payment is
        made at that point by cash, Zelle or Venmo.
      </div>

      <h2>Your details</h2>

      {/* noValidate lets the browser show our own messages consistently. */}
      <form onSubmit={handleSubmit} className="form-grid two-col" noValidate={false}>
        <div className="field">
          <label htmlFor="name">
            Name <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="phone">
            Phone <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <div className="field full">
          <label htmlFor="email">
            Email <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <p className="hint">We use this only to confirm your order.</p>
        </div>

        <div className="field full">
          <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
            <legend style={{ fontSize: "0.85rem", fontWeight: 600, padding: 0 }}>
              How would you like to receive your order?
            </legend>
            <div className="radio-row" style={{ marginTop: "0.4rem" }}>
              <label>
                <input
                  type="radio"
                  name="method"
                  value="pickup"
                  checked={method === "pickup"}
                  onChange={() => setMethod("pickup")}
                />
                Pickup
              </label>
              <label>
                <input
                  type="radio"
                  name="method"
                  value="delivery"
                  checked={method === "delivery"}
                  onChange={() => setMethod("delivery")}
                />
                Local delivery
              </label>
            </div>
            <p className="hint">
              {method === "pickup"
                ? "Pickup is by appointment. We share the address once your order is confirmed."
                : "Delivery available. Cost confirmed after you order, depending on distance and availability."}
            </p>
          </fieldset>
        </div>

        <div className="field">
          <label htmlFor="preferredDate">Preferred date (optional)</label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={preferredDate}
            onChange={(event) => setPreferredDate(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="preferredTime">Preferred time (optional)</label>
          <input
            id="preferredTime"
            name="preferredTime"
            type="text"
            placeholder="e.g. weekday evening"
            value={preferredTime}
            onChange={(event) => setPreferredTime(event.target.value)}
          />
        </div>

        <div className="field full">
          <label htmlFor="notes">Anything else we should know? (optional)</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        {status === "error" && (
          <div className="notice notice-warn full" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="full">
          <button type="submit" className="btn btn-block" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send order request"}
          </button>
          <p className="hint" style={{ textAlign: "center" }}>
            By sending this request you agree to our{" "}
            <Link href="/policies/">policies</Link>, including that all sales are
            final.
          </p>
        </div>
      </form>
    </>
  );
}
