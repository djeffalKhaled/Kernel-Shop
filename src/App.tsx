import "./styles/App.css"
import NavBar from './component/NavBar'
import CategorieBar from "./component/CategorieBar"
import ProductList from "./component/ProductList"
import { useState } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import NavBarSupplier from "./component/NavBarSupplier"
import { CartProvider } from "./context/CartContext";


function App() {
    const [productCategorie, setProductCategorie] = useState("");

    function ClientPage() {
        return (
            <>
            <NavBar></NavBar>
            <CategorieBar updateCategorie = {setProductCategorie}></CategorieBar>
            <ProductList productCategorie = {productCategorie}></ProductList>
            </>
        )
    }

    function SupplierPage() {
        return (
            <>
            <NavBarSupplier></NavBarSupplier>
            <CategorieBar updateCategorie = {setProductCategorie}></CategorieBar>
            <ProductList productCategorie = {productCategorie}></ProductList>
            </>
        )
    }

    return (
        <BrowserRouter>
        <nav>
            <Link to="/client">Client Page</Link> |{" "}
            <Link to="/supplier">Supplier Page</Link> |{" "}
        </nav>

        <Routes>
            <Route path = "/client" element = {<ClientPage></ClientPage>}></Route>
            <Route path = "/supplier" element = {<SupplierPage></SupplierPage>}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default function AppWithProvider() {
    return (
        <CartProvider>
            <App />
        </CartProvider>
    )
}