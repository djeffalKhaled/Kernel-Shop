import "../styles/AddProduct.css"
import AddProduct from "../component/AddProduct"
import { useState } from "react";
import NavBar from "../component/NavBar";

function AddProductPage() {
    const [productCategory, setProductCategorie] = useState("Composants PC"); // default categ
    const [productType, setProductType] = useState("");
    const [search, setSearch] = useState("");

    return (
        <>
            <NavBar updateMainCateg={setProductCategorie} updateType={setProductType} updateSearch = {setSearch}></NavBar>
            <AddProduct></AddProduct>
        </>
    )
}

export default AddProductPage