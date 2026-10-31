// app/cart/page.js
import CartView from "../../components/CartView";

export const metadata = {
  title: "Your cart",
  description: "Review your selected items and send an order request to N2S Boutique.",
};

export default function CartPage() {
  return (
    <div className="container section">
      <CartView />
    </div>
  );
}
