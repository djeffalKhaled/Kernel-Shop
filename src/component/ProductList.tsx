import "../styles/ProductList.css"
import switchImage from "../images/bd4808_08cd1474a7bc498099436aa70333d531~mv2.png"
import ps4Image from "../images/ps4-slim-image-block-01-en-24jul20.png"
import ps5Image from "../images/PS5-Slim-Console-Box-Package.png"
import Product from "./Product"
import { useEffect, useState } from "react"

const PORT_URL = import.meta.env.VITE_PORT_URL; 

// @ts-ignore
function ProductList({productType, productCategorie, productNameSearch}) {
    /*From the categorie prop, SELECT all products that match this given categorie
    and change products' value to it, this should show it inshallah */
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); 
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(productNameSearch.toLowerCase())
    );

    function toSlug(value: string): string {
        return value.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");
    }

    async function getAllProducts() {
        const url = PORT_URL + "/api/products";
        console.log("PRODUCT URL: ", url);
        setProducts([]); 
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            // @ts-ignore
            const newProducts = result.map(item => ({
                id: item.id,
                image: item.imageUrl,
                name: item.name,
                price: item.price
            })).sort((a : any, b : any) => a.name.localeCompare(b.name));
            setProducts(newProducts);
        } catch (error : any) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function getProductByCategory() {
        const url = PORT_URL + "/api/products/category/" + toSlug(productCategorie);
        console.log("PRODUCT URL: ", url);
        setProducts([]); 
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            // @ts-ignore
            const newProducts = result.map(item => ({
                id: item.id,
                image: item.imageUrl,
                name: item.name,
                price: item.price
            })).sort((a : any, b : any) => a.name.localeCompare(b.name));
            setProducts(newProducts);
        } catch (error : any) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function getProductByType() {
        const url = PORT_URL + "/api/products/type/" + toSlug(productType);
        console.log("PRODUCT URL: ", url);
        setProducts([]); 
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            // @ts-ignore
            const newProducts = result.map(item => ({
                id: item.id,
                image: item.imageUrl,
                name: item.name,
                price: item.price
            })).sort((a : any, b : any) => a.name.localeCompare(b.name));
            setProducts(newProducts);
        } catch (error : any) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    
    useEffect(() => {
        console.log("Product List categorie :", productCategorie);
        if (productCategorie === "") {
            getAllProducts();
        } else if (productType === "") {
            getProductByCategory();
        } else {
            getProductByType()
        }
        
    }, [productCategorie, productType]);


    return (
        <>
            {
            loading ? (<div className="Info">Chargement des produits...</div>) : 
            filteredProducts.length === 0 ? (<div className="Info">Aucun produit n'est actuellement disponible.</div>) : 
            (
            <div className = "CenteredProductList">
                <div className="ProductList">
                {filteredProducts.map((item) => (
                    <Product 
                    productId={item.id} 
                    title={item.name} 
                    image={item.image} 
                    price={item.price}
                    />
                ))}
                
                </div>
            </div>
            )
            }
        </>
    );
}
export default ProductList
