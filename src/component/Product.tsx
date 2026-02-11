import "../styles/Product.css"
type ProductProps = {
    productId: number,
    image: string,
    title: string,
    price: number;
};

function Product({productId, image, title, price} : ProductProps) {
  
  return (
    <>
      <div className = "ProductItem" id = {productId.toString()}>
        <div className = "ProductImageCont">
            <img src={image} className = "ProductImage"/>
        </div>
        
        <label htmlFor = "productimage" className = "ProductTitle">{title}</label>
        <div className = "Payment">
            <div className = "Price">{price.toString()}</div>
            <button type = "button" className = "ButtonCart">Ajouter au Panier</button>
        </div>
      </div>
    </>
  )
}

export default Product
