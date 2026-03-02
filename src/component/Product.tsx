import "../styles/Product.css"
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
type ProductProps = {
    productId: number,
    image: string,
    title: string,
    price: number;
};

function Product({productId, image, title, price} : ProductProps) {
  const context = useContext(CartContext);
  if (!context) throw new Error("Product must be used within CartProvider");
  const { addToCart } = context;
  
  return (
    <>
      <div className = "ProductItem" id = {productId.toString()}>
        <div className = "ProductImageCont">
            <img className = "ProductImage" src={image} alt={title} />
        </div>
        
        <label htmlFor = "productimage" className = "ProductTitle">{title}</label>
        <div className = "Price">{price.toString() + " DA"}</div>
        <button type="button"  className="ButtonCart" onClick={() =>{console.log("Clicked!"); addToCart({id: productId, name: title,  price: price,  image: image,quantity: 1,});}}>Ajouter au Panier</button>
      </div>
    </>
  )
}

export default Product
