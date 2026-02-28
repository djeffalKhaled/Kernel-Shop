import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import CategorieBar from "./CategorieBar";
import ProductList from "./ProductList";
import NavBarSupplier from "./NavBarSupplier";

function SupplierPage() {
    const location = useLocation();
    const [productCategory, setProductCategorie] = useState("Composants PC"); // default categ
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
            <NavBarSupplier updateMainCateg={setProductCategorie} updateType={setProductType} updateSearch = {setSearch}></NavBarSupplier>
            <CategorieBar category={productCategory} updateType={setProductType}></CategorieBar>
            <ProductList productType={productType} productCategorie={productCategory} productNameSearch = {search} ></ProductList>
        </>
    );
}

export default SupplierPage