import "./styles/App.css"
import NavBar from './component/NavBar'
import Signup from './component/SignupLogin'
import Product from './component/Product'
import CategorieBar from "./component/CategorieBar"
import ProductList from "./component/ProductList"

function App() {

  return (
    <>
    <NavBar></NavBar>
    <CategorieBar></CategorieBar>
    <ProductList></ProductList>
    </>
  )
}

export default App
