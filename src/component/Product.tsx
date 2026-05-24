import "../styles/Product.css"
import "../styles/ProductMenu.css"
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useState, useRef, useEffect, useContext } from "react";
import { categorytypes } from "../config/categorytypes";

const PORT_URL = import.meta.env.VITE_PORT_URL;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;


type ProductProps = {
    productId: number;
    image: string;
    title: string;
    price: number;
    description?: string;
    stock?: number;
    categorie?: string;
    type?: string;
    onDelete?: (id: number) => void;
    onUpdate?: (id: number, updated: Partial<ProductProps>) => void;

};

function Product({ productId, image, title, price, description = "", stock = 0, categorie = "", type = "", onDelete, onUpdate }: ProductProps) {

    const context = useContext(CartContext);
    const navigate = useNavigate();
    if (!context) throw new Error("Product must be used within CartProvider");
    const { addToCart } = context;

    const userType = localStorage.getItem("type");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const [isFavoris, setIsFavoris] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [comment, setComment] = useState("");
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function toggleFavoris(e: React.MouseEvent) {
        e.stopPropagation();
        setIsFavoris((prev) => !prev);
        
    }

    function submitComment() {
        if (!comment.trim()) return;
        console.log("Comment for product", productId, ":", comment);
        alert("Commentaire ajouté ✅");
        setComment("");
        setShowCommentModal(false);
    }

    
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    async function confirmDelete() {
        try {
            console.log("DELETE URL:", `${PORT_URL}/api/products/${productId}`);
            const res = await fetch(`${PORT_URL}/api/products/${productId}`, { method: "DELETE" });
            console.log("DELETE Response:", res.status);
            alert("Produit supprimé ✅");
            setShowDeleteModal(false);
            onDelete?.(productId); // informs parent list to remove the card
        } catch (err) {
            console.error(err);
        }
    }

    const [showEditModal, setShowEditModal] = useState(false);

    const [editName, setEditName] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    const [editPrice, setEditPrice] = useState(String(price));
    const [editStock, setEditStock] = useState(String(stock));
    const [editCategorie, setEditCategorie] = useState(categorie);
    const [editType, setEditType] = useState(type);
    const [editImageFile, setEditImageFile] = useState<File | null>(null);
    const [editPreviewUrl, setEditPreviewUrl] = useState(image);

    function openEditModal() {
        setEditName(title);
        setEditDescription(description);
        setEditPrice(String(price));
        setEditStock("0");
        setEditCategorie(categorie);
        setEditType(type);
        setEditPreviewUrl(image);
        setEditImageFile(null);
        setMenuOpen(false);
        setShowEditModal(true);
    }

    function handleEditImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setEditImageFile(file);
        if (file) setEditPreviewUrl(URL.createObjectURL(file));
    }

    async function uploadToCloudinary(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "productimages");
        formData.append("folder", "samples");
        const res = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
        const data = await res.json();
        return data.secure_url;
    }

    async function saveEdit() {
        console.log("PUT URL:", `${PORT_URL}/api/products/${productId}`);

        let imageUrl = editPreviewUrl;
        try {
            if (editImageFile) imageUrl = await uploadToCloudinary(editImageFile);
        } catch (err) {
            alert("Cloudinary error — image non mise à jour.");
        }
        try {
            const res = await fetch(`${PORT_URL}/api/products/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: editName,
                    description: editDescription,
                    price: Number(editPrice),
                    stock: stock + Number(editStock),
                    categorie: editCategorie,
                    type: editType,
                    imageUrl: imageUrl,
                }),
            });
            console.log("PUT Response:", res.status);
            const data = await res.json();
            console.log("Updated:", data);
            alert("Produit mis à jour ✅");
            setShowEditModal(false);
            onUpdate?.(productId, { // ✅ instantly updates card in parent list
            title: editName, description: editDescription,
            price: Number(editPrice), stock: Number(editStock),
            categorie: editCategorie, type: editType, image: imageUrl,
        });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="ProductItem">

                {/* Three-dot menu */}
                {userType === "suppliers" && (
                    <div className="ProductMenuWrapper" ref={menuRef}>
                        <button
                            className="ProductMenuBtn"
                            onClick={() => setMenuOpen((o) => !o)}
                            aria-label="Options"
                        >
                            &#8942;
                        </button>

                        {menuOpen && (
                            <div className="ProductDropdown">
                                <button className="ProductDropdownItem" onClick={openEditModal}>
                                    Modifier le produit
                                </button>
                                <button
                                    className="ProductDropdownItem delete"
                                    onClick={() => { setMenuOpen(false); setShowDeleteModal(true); }}
                                >
                                    Supprimer le produit
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {/* Product image */}
                <div className="ProductImageCont" onClick={() => navigate(`/product/${productId}`)} style={{ cursor: "pointer" }}>
                    <img className="ProductImage" src={image} alt={title} />
                </div>

                <label className="ProductTitle" onClick={() => navigate(`/product/${productId}`)} style={{ cursor: "pointer" }}>{title}</label>

                <div className="Payment">
                    <div className="Price">{price} DA</div>
                    <button
                        type="button"
                        className="ButtonCart"
                        onClick={() => {addToCart({ id: productId, name: title, price, image, quantity: 1 });
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 2500);
                        }}
                    >
                        Ajouter au Panier
                    </button>
                    
                </div>
                    
                <div className="ProductIconActions">
                    {/*/* Comment 
                        <button
                            type="button"
                            className="ProductIconBtn CommentBtn"
                            onClick={(e) => { e.stopPropagation(); setShowCommentModal(true); }}
                            title="Laisser un commentaire"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                        </button>
                        */}
                        {/* Favoris 
                        <button
                            type="button"
                            className={`ProductIconBtn FavorisBtn ${isFavoris ? "active" : ""}`}
                            onClick={toggleFavoris}
                            title={isFavoris ? "Retirer des favoris" : "Ajouter aux favoris"}
                        >
                            <svg viewBox="0 0 24 24" fill={isFavoris ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </button>
                        */}
                    </div>

                {showToast && (
                        <div className="AddedToast">✅ Ajouté au panier !</div>
                    )}

            </div>

            {/* ── Delete Confirmation Modal ── */}
            {showDeleteModal && (
                <div className="ModalOverlay">
                    <div className="ModalBox">
                        <h3 className="ModalTitle">Supprimer le produit</h3>
                        <p className="ModalMessage">
                            Êtes-vous sûr de vouloir supprimer <strong>{title}</strong> ? Cette action est irréversible.
                        </p>
                        <div className="ModalActions">
                            <button className="ModalBtn cancel" onClick={() => setShowDeleteModal(false)}>
                                Annuler
                            </button>
                            <button className="ModalBtn delete" onClick={confirmDelete}>
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Edit Product Modal ── */}
            {showEditModal && (
                <div className="ModalOverlay">
                    <div className="ModalBox EditModal">
                        <h3 className="ModalTitle">Modifier le produit</h3>

                        {/* Image preview + upload */}
                        <div className="EditImageRow">
                            <img src={editPreviewUrl} alt="preview" className="EditImagePreview" />
                            <div className="ImageInput">
                                <label htmlFor={`editImg-${productId}`} className="ImageLabel">
                                    {editImageFile ? editImageFile.name : "Changer l'image"}
                                </label>
                                <input
                                    type="file"
                                    id={`editImg-${productId}`}
                                    accept="image/*"
                                    onChange={handleEditImage}
                                    className="HideInput"
                                />
                            </div>
                        </div>

                        {/* Name */}
                        <div className="form-row">
                            <input
                                type="text"
                                className="input"
                                placeholder="Nom"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                            
                        </div>

                        {/* Description */}
                        <textarea
                            className="input"
                            placeholder="Description"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                        />

                        {/* Stock + Price */}
                        <div className="form-row">
                            <input
                                className="input"
                                type="number"
                                placeholder="Quantité a ajouter"
                                value={editStock}
                                onChange={(e) => setEditStock(e.target.value)}
                            />
                            <input
                                type="text"
                                className="input"
                                placeholder="Prix"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                            />
                        </div>

                        {/* Categorie + type */}
                        <div className="form-row">
                            <select
                                className="custom-select"
                                value={editCategorie}
                                onChange={(e) => { setEditCategorie(e.target.value); setEditType(""); }}
                            >
                                <option value="">Selectionner une Catégorie</option>
                                {Object.keys(categorytypes).map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <select
                                className="custom-select"
                                value={editType}
                                onChange={(e) => setEditType(e.target.value)}
                                disabled={!editCategorie}
                            >
                                <option value="">Selectionner une type</option>
                                {editCategorie && categorytypes[editCategorie].map((sub) => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                        </div>

                        {/* Actions */}
                        <div className="ModalActions">
                            <button className="ModalBtn cancel" onClick={() => setShowEditModal(false)}>
                                Annuler
                            </button>
                            <button className="ModalBtn save" onClick={saveEdit}>
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Product;
