import "../styles/Navbar.css"
import ukIcon from "../icons/uk_icon.png"
import frIcon from "../icons/fr_icon.png"
import algIcon from "../icons/alg_icon.png"
import kernelIcon from "../icons/_Ker_nel.svg"
import accountIcon from "../icons/account_circle.svg"
import shopingIcon from "../icons/Shopping cart.svg"
import languageIcon from "../icons/language.svg"
import hamBurgMenu from "../icons/icon.svg"
import { useState } from "react"
import SignupLogin from "./SignupLogin"
import CartDrawer from "./CartDrawer";


function NavBar() {
  
  const [showSignupComp, setShowSignup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [language, setLanguage] = useState("Francais"); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleSelect = (lang: string) => {
    setLanguage(lang);
    setShowDropdown(false); 
  };

  const flags: Record<string, string> = {
    English: ukIcon,
    French: frIcon,
    Arabic: algIcon,
  };

  function showSignup() {
    setShowSignup(!showSignupComp);
  }
  
  return (
    <>
      <div className = "Bar">
            <img className = "Logo" src = {kernelIcon} style={{width: "124px"}}/>


            <div className = "SearchInput">
                <input type = "text" placeholder="Rechercher un produit..."/>
                <button type = "button">
                  <img src = {hamBurgMenu}/>
                  Categories
                </button>
            </div>
          <div className="RightSection">
            <div className = "IconBtn">
                    <div className="IconBtn" onClick={() => setIsCartOpen(true)}>
                      <img src={shopingIcon} alt="Cart" />
                    </div>
            </div>

            <div className="IconBtn">
                <img src = {languageIcon} alt="Language" className="IconBtn" onClick={toggleDropdown}/>
                {showDropdown && (
                  <div className="LanguagePopup">
                    {["English", "French", "Arabic"].map((lang) => (
                      <div key={lang} className="LanguageOption" onClick={() => handleSelect(lang)}>
                        <img src={flags[lang]} alt={lang} className="FlagIcon" />
                        <span>{lang}</span>
                      </div>
                    ))}
                    </div>
                    )}
            </div >
              <div className="IconBtn" onClick={showSignup}>   
                <img src = {accountIcon} alt="Account" onClick={showSignup}/>
              </div>

              {showSignupComp && (
                <SignupLogin onClose={() => setShowSignup(false)} />
              )}
            </div>
          </div>

          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}/>
 
          {isCartOpen && (
            <div className="CartOverlay" onClick={() => setIsCartOpen(false)}></div>
          )}
    </>
  );
}

export default NavBar;
