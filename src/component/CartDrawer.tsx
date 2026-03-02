import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/CartDrawer.css";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};



export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartDrawer must be used inside CartProvider");

  const { cartItems, removeFromCart,clearCart , totalPrice } = context;
  console.log("CART ITEMS:", cartItems);

  const handleCheckout = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/commandes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: "123", // later replace with real logged user
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la commande");
    }

    const data = await response.json();
    console.log("Commande créée :", data);

    alert("Commande envoyée avec succès !");
    clearCart();
  } catch (error) {
    console.error(error);
    alert("Erreur serveur !");
  }
};
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
          <button className="Checkout" onClick={handleCheckout}>COMMANDER</button>
        </div>

      </div>
    </>
  );
}
