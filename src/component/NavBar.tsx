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
import CartDrawer from "../component/CartDrawer"

// @ts-ignore
function NavBar({updateMainCateg, updateType, updateSearch}) {
    const [search, setSearch] = useState("");
    const [showSignupComp, setShowSignup] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const toggleDropdown = () => {setShowDropdown(!showDropdown)};
    const toggleCategories = () => {setShowCategories(!showCategories)};
    const [language, setLanguage] = useState("Francais");
    const [isCartOpen, setIsCartOpen] = useState(false);

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

    const handleCategories = (categ: string) => {
        updateMainCateg(categ);
        updateType(""); // inits the type to nothing for the user to choose (ProductList will show all products of a category)
        window.history.pushState(null, "", `/client/category/${encodeURIComponent(categ)}`);
    };

    return (
        <>
            <div className="Bar">
                <img className="Logo" src={kernelIcon} style={{ width: "124px" }} />


                <div className="SearchInput">
                    <input type="text" placeholder="Rechercher un produit..." 
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        updateSearch(e.target.value);
                    }}/>
                    <div className = "Categories" onMouseEnter = {() => setShowCategories(true)} onMouseLeave = {() => setShowCategories(false)}>
                        <button type="button">
                            <img src={hamBurgMenu} className = "HamburgerIcon" />
                            Categories
                        </button>
                        {showCategories && (
                            <div className="CategoriesPopup">
                                {["Composants PC", "Moniteurs", "Consoles", "Accessoires Gaming", "Péripheriques PC", "Réseaux"].map((categ) => (
                                    <div key={categ} className="CategoryOption" onClick={() => handleCategories(categ)}>
                                        <span>{categ}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className = "BarButtons">
                    <div className = "IconButton">
                        <img src = {shopingIcon} onClick = {() => setIsCartOpen(true)} alt = "Cart"></img>
                    </div>

                    <div className = "IconButton LanguageButton" onMouseEnter = {() => setShowDropdown(true)} onMouseLeave = {() => setShowDropdown(false)}>
                        <img src = {languageIcon} alt = "Language"></img>
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
                    </div>

                    <div className = "IconButton">
                        <img src = {accountIcon} onClick = {showSignup} alt = "Account"></img>
                    </div>
                </div>
            </div>

            
            {showSignupComp && (
                <SignupLogin onClose={() => setShowSignup(false)} />
            )}

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}/>

            {isCartOpen && (
                <div className="CartOverlay" onClick={() => setIsCartOpen(false)}></div>
            )}
        </>
    );
}

export default NavBar;
