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
                    imageUrl: imageUrl
                })
            })

            const data = await response.json();
            console.log("Product added to database:", data);
        } catch (error : any) {
            console.error(error.message);
        }
    }

    
    return (
        <>
        <div className = "Background">
        <div className = "ProductForm">
            Add New Product :
            <label htmlFor="productImage">Image:</label>
            <input onChange = {(x) => setImageFile(x.target.files?.[0] ?? null)} type="file" id="productImage" name="productImage" accept="image/*" />

            <label htmlFor="productName">Name:</label>
            <input onChange = {(x) => setName(x.target.value)} type="text" id="productName" name="productName" />

            <label htmlFor="productDescription">Description:</label>
            <textarea onChange = {(x) => setDescription(x.target.value)} id="productDescription" name="productDescription" />

            <label htmlFor="productPrice">Price:</label>
            <input onChange = {(x) => setPrice(Number(x.target.value))} type="number" id="productPrice" name="productPrice" />

            <label htmlFor="productStock">Stock:</label>
            <input onChange = {(x) => setStock(Number(x.target.value))} type="number" id="productStock" name="productStock" />

            <button onClick = {addProduct} type="button">Add Product</button>
            <button type = "button" onClick={onClose}>Exit</button>
        </div> 
        </div>
        </>  
    )
}

export default AddProduct
