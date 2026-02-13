import { useEffect, useState } from "react";
import "../styles/CategorieBar.css"

// @ts-ignore
function CategorieBar({updateCategorie}) {
    /* Fetches all categories from backend and shows them */


    const [categType, setCategType] = useState("");

    function updateCateg(type : string) {
        setCategType(type);
        updateCategorie(type);
    }


    useEffect(() => {
        console.log("Current categorie :", categType);
    }, [categType]);


    // for now this is a horrible method but i will come up with a better solution at some point
    // this section needs more work
    return (
        <>
            <div className = "CategorieBar">
                <div className="Title">{"> COMPOSANTS PC"}</div>
                <ul className = "List">
                    <li onClick={() => updateCateg("CPU")}>CPU</li>
                    <li onClick={() => updateCateg("Motherboard")}>Carte Mére</li>
                    <li onClick={() => updateCateg("RAM")}>RAM</li>
                    <li onClick={() => updateCateg("GPU")}>GPU</li>
                    <li onClick={() => updateCateg("Boitiers")}>Boitiers</li>
                    <li onClick={() => updateCateg("Alimentation")}>Alimentation</li>
                    <li onClick={() => updateCateg("Stockage")}>Stockage</li>
                    <li onClick={() => updateCateg("Refroidissement")}>Refroidissement</li>
                </ul>

            </div>
        
        </>
    )
}

export default CategorieBar
