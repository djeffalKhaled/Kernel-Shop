import "./styles/App.css"
import NavBar from './component/NavBar'
import Signup from './component/SignupLogin'
import Product from './component/Product'
import CategorieBar from "./component/CategorieBar"
import ProductList from "./component/ProductList"
import { useState } from "react"

function App() {
  const [productCategorie, setProductCategorie] = useState("");

  return (
    <>
    <NavBar></NavBar>
    <CategorieBar updateCategorie = {setProductCategorie}></CategorieBar>
    <ProductList productCategorie = {productCategorie}></ProductList>
    </>
  )
}

export default App
