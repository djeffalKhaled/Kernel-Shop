import { useContext , useState } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/CartDrawer.css";

const PORT_URL = import.meta.env.VITE_PORT_URL;

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartDrawer must be used inside CartProvider");

  const { cartItems, removeFromCart, clearCart, totalPrice } = context;
  const [ordering, setOrdering] = useState(false);
  
  async function handleCommander() {
    const clientId = localStorage.getItem("userid");
    if (!clientId) {
        alert("Vous devez être connecté pour commander.");
        return;
    }
    if (cartItems.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    setOrdering(true);
    try {
        const res = await fetch(`${PORT_URL}/api/commandes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId: clientId,
                items: cartItems.map(item => ({
                    productId: String(item.id),  // backend expects String
                    quantity: item.quantity,
                    price: item.price,
                })),
            }),
        });

        if (!res.ok) throw new Error("Erreur lors de la commande");

        const data = await res.json();
        console.log("Commande créée:", data);
        clearCart();    // ← empty the cart
        onClose();      // ← close the drawer
        alert("✅ Commande passée avec succès !");
    } catch (err) {
        console.error(err);
        alert("❌ Erreur lors de la commande. Réessayez.");
    } finally {
        setOrdering(false);
    }
  }
  
  return (
    <>
      <div className={`CartOverlay ${isOpen ? "show" : ""}`} onClick={onClose}></div>
      <div className={`CartDrawer ${isOpen ? "open" : ""}`}>
        
        <div className="CartHeader">
          <h2>Mon panier</h2>
          <button className="CloseBtn" onClick={onClose}>✕</button>
        </div>

        <div className="CartItems">
          {cartItems.length === 0 ? (
            <p className="Empty">Votre panier est vide</p>
          ) : (
            cartItems.map(item => (
              <div className="CartItem" key={item.id}>
                
                <div className="ItemImage"></div>

                <div className="ItemInfo">
                  <h4>{item.name}</h4>
                  <span>{item.quantity} × {item.price} DA</span>
                </div>

                <button
                  className="RemoveBtn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>

              </div>
            ))
          )}
        </div>

        <div className="CartFooter">
          <div className="Subtotal">
            <span>Sous-total :</span>
            <b>{totalPrice} DA</b>
          </div>
            <button 
              className="Checkout"
              onClick={handleCommander}
              disabled={ordering || cartItems.length === 0}>
              {ordering ? "En cours..." : "COMMANDER"}
            </button>
        </div>

      </div>
    </>
  );
}
