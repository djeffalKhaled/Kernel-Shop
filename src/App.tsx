import "./styles/App.css"
import NavBar from './component/NavBar'
import Signup from './component/SignupLogin'
import Product from './component/Product'
import CategorieBar from "./component/CategorieBar"
import ProductList from "./component/ProductList"
import { useState } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import AddProduct from "./component/AddProduct"
import NavBarSupplier from "./component/NavBarSupplier"
import ClientPage from "./component/ClientPage"

function App() {

    // need to add support for supplier page
    function SupplierPage() {
        return (
            <>
            <NavBarSupplier></NavBarSupplier>
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

export default App
