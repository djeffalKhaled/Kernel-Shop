import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/CartDrawer.css";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, totalPrice } = useContext(CartContext);

  return (
    <>
      {/* OVERLAY */}
      <div className={`CartOverlay ${isOpen ? "show" : ""}`} onClick={onClose}></div>

      {/* DRAWER */}
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

        {/* FOOTER */}
        <div className="CartFooter">
          <div className="Subtotal">
            <span>Sous-total :</span>
            <b>{totalPrice} DA</b>
          </div>

          <button className="ViewCart">VOIR LE PANIER</button>
          <button className="Checkout">COMMANDER</button>
        </div>

      </div>
    </>
  );
}
