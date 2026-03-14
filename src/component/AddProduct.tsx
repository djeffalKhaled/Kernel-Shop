import { useState } from "react";
import "../styles/AddProduct.css"
import "../styles/Product.css"
const PORT_URL = import.meta.env.VITE_PORT_URL;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
import { categorytypes } from "../config/categorytypes"
// comp where a supplier can add their products

// @ts-ignore
function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");

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
    async function uploadToCloudinary(file: any) {
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
        } catch (error: any) {
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
                    price: Number(price),
                    stock: Number(stock),
                    imageUrl: imageUrl
                })
            })

            const data = await response.json();
            console.log("Product added to database:", data);
            alert("Product Added!");
        } catch (error: any) {
            console.error(error.message);
        }
    }

    function updateImageInput(image: any) {
        const file = image.target.files?.[0] ?? null;
        setImageFile(file);
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        } else {
            setPreviewUrl("");
        }
    }


    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory(""); // reset subcategory when category changes
    };


    return (
        <div className="AddProduct">
            <div className="ProductForm">
                <div className = "form-row">
                    <input type="text" className="input" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
                    <div className="ImageInput">
                        <label htmlFor="productImage" className="ImageLabel">
                            {imageFile ? imageFile.name : "Upload Image"} 
                        </label>
                        <input type="file" id="productImage" name="productImage" accept="image/*" onChange={(x) => updateImageInput(x)} className="HideInput"/>
                    </div>
                </div>

                <textarea className="input" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>

                <div className="form-row"> 
                    <input className="input" type="number" placeholder="Stock" onChange={(e) => setStock(e.target.value)}/>
                    <input type="text" className="input" placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className="form-row">
                    <select className = "custom-select" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">Selectionner une Catégorie</option>
                        {Object.keys(categorytypes).map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <select className = "custom-select" value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} disabled={!selectedCategory}>
                        <option value="">Selectionner une type</option>
                        {selectedCategory && categorytypes[selectedCategory].map((sub) => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                </div>

                <button onClick={addProduct} type="button">Add Product</button>
            </div>

            <div className="ProductItem">
                <div className="ProductImageCont">
                    {previewUrl ? (
                        <img className="ProductImage" src={previewUrl} alt={name} />
                    ) : (
                        <div className="ImagePreview">No Image</div>
                    )}
                </div>
                <label className="ProductTitle">
                    {name || "Product Name Preview"}
                </label>

                <div className="Payment">
                    <div className="Price">
                        {price !== "" ? price + " DA" : "0 DA"}
                    </div>
                    <button type="button" className="ButtonCart">Ajouter au Panier</button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
