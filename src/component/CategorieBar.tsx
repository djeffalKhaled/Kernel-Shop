import { useEffect, useState } from "react";
import "../styles/CategorieBar.css"
import { categorytypes } from "../config/categorytypes";

// @ts-ignore
function CategorieBar({category, updateType}) {
    /* of a given category, shows all of its types */


    const [categType, setCategType] = useState("");

    function updateCateg(type : string) {
        console.log("Gotten type : ", type);
        setCategType(type);
        updateType(type);
    }

    useEffect(() => {

    }, [category]);

    // gets all the exact subcategories within the maincateg (i suck at naming things wth)
    const types = categorytypes[category] || [];

    return (
    <div className="CategorieBar">
        <div className="Title">{"> " + category.toUpperCase()}</div>
        <ul className="List">
            {types.map((item : any) => (
                <li key={item} onClick={() => updateCateg(item)}>
                    {item}
                </li>
            ))}
        </ul>
    </div>
    );
}

export default CategorieBar
