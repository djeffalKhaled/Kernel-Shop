import "../styles/ProductList.css"
import switchImage from "../images/bd4808_08cd1474a7bc498099436aa70333d531~mv2.png"
import ps4Image from "../images/ps4-slim-image-block-01-en-24jul20.png"
import ps5Image from "../images/PS5-Slim-Console-Box-Package.png"
import Product from "./Product"

function ProductList() {
  const products = [
    { id: 1, image: switchImage, name: "Nintendo Switch 2", price: 50000 },
    { id: 2, image: ps4Image, name: "Playstation 4", price: 40000 },
    { id: 3, image: ps5Image, name: "Playstation 5", price: 130000 }
  ];

  return (
    <>
        <div className="ProductList">
            {products.map((item) => (
                <Product 
                productId={item.id} 
                title={item.name} 
                image={item.image} 
                price={item.price}
                />
            ))}
        </div>
    </>
  );
}
export default ProductList
