import "./styles/App.css"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import ClientPage from "./pages/ProductsPage"
import { CartProvider } from "./context/CartContext"
import AddProductPage from "./pages/AddProductPage"
import HomePage from "./pages/HomePage"

function App() {

    return (
        <BrowserRouter>
        <nav>
            <Link to="/products">Products Page</Link> |{" "}
            <Link to="/home">Home Page</Link> |{" "}
        </nav>

        <Routes>
            <Route path = "/products" element = {<ClientPage></ClientPage>}></Route>
            <Route path = "/home" element = {<HomePage></HomePage>}></Route>
            <Route path = "/add-product" element = {<AddProductPage></AddProductPage>}></Route>
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