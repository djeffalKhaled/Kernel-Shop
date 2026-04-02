import "./styles/App.css"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import ClientPage from "./pages/ProductsPage"
import { CartProvider } from "./context/CartContext"
import AddProductPage from "./pages/AddProductPage"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import Footer from "./component/Footer"

function App() {

    return (
        <BrowserRouter>
        <nav>
            <Link to="/home">Home Page</Link> |{" "}
        </nav>

        <Routes>
            <Route path = "/home" element = {<HomePage></HomePage>}></Route>
            <Route path = "/add-product" element = {<AddProductPage></AddProductPage>}></Route>
            <Route path="/product/:id" element={<ProductPage />} />
        </Routes>

        <Footer />
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