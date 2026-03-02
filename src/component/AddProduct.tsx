import { useState } from "react";
import "../styles/AddProduct.css"
const PORT_URL = import.meta.env.VITE_PORT_URL;
const  CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
// comp where a supplier can add their products

// @ts-ignore
function AddProduct({onClose}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [stock, setStock] = useState<number | "">("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const categories = {
    "composants-pc": [
        "cpu",
        "ram",
        "gpu",
        "carte-mère",
        "boitiers",
        "alimentation",
        "stockage",
        "refroidissement",
    ],
    console: ["playstation", "nintendo", "xbox"],
    Moniteurs : ["1080p", "1440p", "4k", "ultrawide"],
    "Accessoires-Gaming" : ["Manettes", "casque", "chaises-gaming"],
    "Périphériques-Pc" : ["claviers", "souris", "Webcams", "Microphones"],
    Reseaux : ["Routeurs", "Switchs", "Cartes-Réseau"],
};

    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    /* im using a cloud hosting service for images, its cloudinary, you gotta set it up so that images are correctly saved!
    to set it up right just follow these steps (its ez) :
        - make a cloudinary account https://cloudinary.com/
        - once logged in, go to settings
        - look left, click on "Upload" (it's right after API keys)
        - Press add upload preset
        - upload preset name : productimages
        - signing mode : unsigned
        - asset folder : samples
        - click save
        - look top left, there is a tiny blue DR code, that's your api
        - copy it and go to .env, paste it where I wrote <PUT_YOUR_API_HERE>
        - enjoy
    */
    async function uploadToCloudinary(file : any) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "productimages");
        formData.append("folder", "samples");
        
        const response = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        // this is the exact url for the image, retreived from cloudinary's api
        return data.secure_url; 
    }

    async function addProduct() {
        const url = PORT_URL + "/api/products";
        // uploads the image file into cloudinary 
        // if everything is fine, it retreives it, else alert user that cloudinary
        // might be out (or just basic api issue in .env)
        let imageUrl = "";
        try {
            if (imageFile) {
                imageUrl = await uploadToCloudinary(imageFile);
            }
        } catch (error : any) {
            alert("CLOUDINARY ERROR (" + error + ") - CANNOT STORE IMAGE! : Either API key isn't set up right or cloudinary isn't working at the moment...")
        }
        
        // main post req
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: price,
                    stock: stock,
                    imageUrl: imageUrl,
                    categorie: category,
                    type: type
                    
                })
            })
            
            const data = await response.json();
            console.log("Product added to database:", data);
            alert("Produit ajouté avec succès ! ✅");
        } catch (error : any) {
            console.error(error.message);
        }
    }

    
    return (
        <>
        <div className = "Background">
            <div className = "ProductForm">
                <h2 style={{ textAlign: "center" }}>Nv Produit : </h2>
                <div className="form-row"> 
                    <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" className="input" placeholder="Prix" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </div>
                <div className="form-row">
                    <div className="select-wrapper">
                        <select className="custom-select" value={category}  onChange={(e) => {setCategory(e.target.value); setType("");}} >
                            <option value="">Categorie</option>
                            {Object.keys(categories).map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>))}
                        </select>
                    </div>

                    <div className="select-wrapper">
                        <select className="custom-select" value={type} onChange={(e) => setType(e.target.value)} disabled={!category}>
                            <option value="">Type</option>
                            {category && categories[category as keyof typeof categories].map((t) => (<option key={t} value={t}>{t}</option> ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <input className="input"type="number" placeholder="Stock" onChange={(e) => setStock(Number(e.target.value))}/>
                </div>    
                    <input className="input" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}/>
                
                <textarea className="input" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
                <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>    
                    <button onClick={addProduct} className="login-button">
                     ajouter Produit
                    </button>
                </div>
            </div>
        </div>
        
        </>  
    )
}

export default AddProduct
