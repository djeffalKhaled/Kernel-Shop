import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../component/NavBar";
import CategorieBar from "../component/CategorieBar";
import ProductList from "../component/ProductList";

function HomePage() {
    const location = useLocation();
    const [productCategory, setProductCategorie] = useState(""); // shows all products 
    const [productType, setProductType] = useState("");
    const [search, setSearch] = useState("");
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlCategory = params.get("category");
        if (urlCategory) {
            setProductCategorie(decodeURIComponent(urlCategory));
        }
    }, [location.search]);

    return (
        <>
            <NavBar updateMainCateg={setProductCategorie} updateType={setProductType} updateSearch = {setSearch}></NavBar>
            <ProductList productType={productType} productCategorie={productCategory} productNameSearch = {search} ></ProductList>
        </>
    );
}

export default HomePage