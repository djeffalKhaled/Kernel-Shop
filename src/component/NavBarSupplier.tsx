import "../styles/Navbar.css"
import kernelIcon from "../icons/_Ker_nel.svg"
import accountIcon from "../icons/account_circle.svg"
import shopingIcon from "../icons/Shopping cart.svg"
import languageIcon from "../icons/language.svg"
import hamBurgMenu from "../icons/icon.svg"
import { useState } from "react"
import SignupLogin from "./SignupLogin"
import AddProduct from "./AddProduct"

// only shows up for suppliers
function NavBarSupplier() {

  const [showSignupComp, setShowSignup] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  function showSignup() {
    setShowSignup(!showSignupComp);
  }

  function showAddProductBtn() {
    setShowAddProduct(!showAddProduct);
  }
  
  return (
    <>
      <div className = "Bar">
            <img className = "Logo" src = {kernelIcon} style={{width: "124px"}}></img>


            <div className = "SearchInput">
                <input type = "text" placeholder="Rechercher un produit..."></input>
                <button type = "button">
                  <img src = {hamBurgMenu}></img>
                  Categories
                </button>
            </div>

            <div className = "BarButtons">
                <button type = "button" onClick={showAddProductBtn}>
                  Add Product
                </button>
                <img src = {shopingIcon}></img>
                <img src = {languageIcon}></img>
                <img src = {accountIcon} onClick={showSignup}></img>
            </div>

            {showSignupComp && (
              <SignupLogin onClose={() => setShowSignup(false)} />
            )
            }

            {showAddProduct && (
              <AddProduct onClose={() => setShowAddProduct(false)}></AddProduct>
            )}

            
      </div>
    </>
  )
}

export default NavBarSupplier
