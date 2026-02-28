import "./styles/App.css"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import ClientPage from "./component/ClientPage"
import SupplierPage from "./component/SupplierPage"
import { CartProvider } from "./context/CartContext"

function App() {

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