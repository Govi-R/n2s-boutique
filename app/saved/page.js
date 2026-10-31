// app/saved/page.js
import SavedView from "../../components/SavedView";

export const metadata = {
  title: "Saved items",
  description: "Items you have saved for later at N2S Boutique.",
};

export default function SavedPage() {
  return (
    <div className="container section">
      <SavedView />
    </div>
  );
}
