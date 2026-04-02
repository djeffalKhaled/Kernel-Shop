import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import NavBar from "../component/NavBar";
import "../styles/ProductPage.css";

const PORT_URL = import.meta.env.VITE_PORT_URL;

function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isFavoris, setIsFavoris] = useState(false);
    const [avis, setAvis] = useState<any[]>([]);
    const [selectedScore, setSelectedScore] = useState(0);
    const [newComment, setNewComment] = useState("");
    const clientId = localStorage.getItem("userid");
    const username = localStorage.getItem("username");
    const userType = localStorage.getItem("type");
    const [page, setPage] = useState(0);

    useEffect(() => {
        async function fetchReviews() {
            try {
                console.log("Fetching reviews for product:", id);
                const res = await fetch(`${PORT_URL}/api/reviews/product/${id}`);
                console.log("Reviews status:", res.status);
                const data = await res.json();
                console.log("Reviews data:", data);
                setAvis(data);
            } catch (err) {
                console.error("Reviews fetch error:", err);
            }
        }
        fetchReviews();
    }, [id]);

    async function submitAvis() {
    if (!clientId) {
        alert("Vous devez être connecté pour laisser un avis.");
        return;
    }
    if (selectedScore === 0 || !newComment.trim()) {
        alert("Veuillez donner une note et un commentaire.");
        return;
    }
    try {
        const res = await fetch(`${PORT_URL}/api/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: id,
                clientId: clientId,
                username: username,
                comment: newComment,
                score: selectedScore,
            }),
        });
        const saved = await res.json();
        setAvis(prev => [...prev, saved]); 
        setSelectedScore(0);
        setNewComment("");
    } catch (err) {
        console.error(err);
    }
}

    const context = useContext(CartContext);
    if (!context) throw new Error("Must be used within CartProvider");
    const { addToCart } = context;

    useEffect(() => {

        async function fetchProduct() {
            console.log("Fetching product id:", id);
            try {
                const res = await fetch(`${PORT_URL}/api/products/${id}`);
                console.log("Response status:", res.status);
                const data = await res.json();
                console.log("Product data:", data);
                setProduct(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) return (
        <>
            <NavBar updateMainCateg={() => {}} updateType={() => {}} updateSearch={() => {}} />
            <div className="PDLoading">Chargement...</div>
        </>
    );

    if (!product) return (
        <>
            <NavBar updateMainCateg={() => {}} updateType={() => {}} updateSearch={() => {}} />
            <div className="PDLoading">Produit introuvable.</div>
        </>
    );

    return (
        <>
            <NavBar updateMainCateg={() => {}} updateType={() => {}} updateSearch={() => {}} />
            <div className="PDPage">

                {/* Breadcrumb */}
                <div className="PDBreadcrumb">
                    <span onClick={() => navigate("/products")} className="PDBreadcrumbLink">
                        Accueil
                    </span>
                    <span className="PDBreadcrumbSep"> / </span>
                    <span className="PDBreadcrumbLink" onClick={() => navigate(`/products?category=${product.categorie}`)}>
                        {product.categorie}
                    </span>
                    <span className="PDBreadcrumbSep"> / </span>
                    <span>{product.name}</span>
                </div>

                <div className="PDContainer">

                    {/* Left — Image */}
                    <div className="PDImageSection">
                        <div className="PDImageWrapper">
                            <img src={product.imageUrl} alt={product.name} className="PDImage" />
                        </div>
                    </div>

                    {/* Right — Details */}
                    <div className="PDDetails">
                        <h1 className="PDTitle">{product.name}</h1>
                            
                        <div className="PDPrice">{product.price.toLocaleString()} DA</div>

                        <div className="PDDivider" />

                        <div className="PDDescriptionSection">
                            <h3 className="PDSectionLabel">Description</h3>
                            <p className="PDDescription">
                                {product.description && product.description !== ""
                                    ? product.description
                                    : "Aucune description disponible pour ce produit."}
                            </p>
                        </div>

                        <div className="PDDivider" />

                        <div className="PDMeta">
                            {product.categorie && (
                                <div className="PDMetaItem">
                                    <span className="PDMetaLabel">Catégorie :</span>
                                    <span className="PDMetaValue">{product.categorie}</span>
                                </div>
                            )}
                            {product.type && (
                                <div className="PDMetaItem">
                                    <span className="PDMetaLabel">Type :</span>
                                    <span className="PDMetaValue">{product.type}</span>
                                </div>
                            )}
                            <div className="PDMetaItem">
                                <span className="PDMetaLabel">Stock :</span>
                                <span className={`PDMetaValue ${product.stock > 0 ? "PDInStock" : "PDOutStock"}`}>
                                    {product.stock > 0 ? `${product.stock} disponible(s)` : "Rupture de stock"}
                                </span>
                            </div>
                        </div>

                        <div className="PDActions">
                            <button
                                className="PDAddToCart"
                                disabled={product.stock === 0}
                                onClick={() => addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.imageUrl,
                                    quantity: 1,
                                })}
                            >
                                Ajouter au Panier
                            </button>

                            <button
                                type="button"
                                className={`PDFavorisBtn ${isFavoris ? "active" : ""}`}
                                onClick={() => setIsFavoris(f => !f)}
                                title={isFavoris ? "Retirer des favoris" : "Ajouter aux favoris"}
                            >
                                <svg viewBox="0 0 24 24" fill={isFavoris ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                </svg>
                            </button>

                            <button className="PDBack" onClick={() => navigate(-1)}>
                                ← Retour
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Avis Section ── */}
                <div className="PDAvisSection">
                    <div className="PDAvisTabs">
                        <span className="PDAvisTab active">Avis ({avis.length})</span>
                    </div>

                    <div className="PDAvisContent">
                        {/* Left — existing reviews */}
                        <div className="PDAvisLeft">
                            <h3 className="PDAvisTitle">AVIS</h3>
                            {avis.length === 0 ? (
                                <p className="PDAvisEmpty">Il n'y a pas encore d'avis.</p>
                            ) : (
                                <>
                                    {avis.slice(page * 5, page * 5 + 5).map((a, i) => (  
                                        <div key={i} className="PDAvisItem">
                                            <div className="PDAvisItemHeader">
                                                <span className="PDAvisUsername">👤 {a.username}</span>
                                                <div className="PDAvisStars">
                                                    {"★".repeat(a.score)}{"☆".repeat(5 - a.score)}
                                                </div>
                                            </div>
                                            <p className="PDAvisText">{a.comment}</p>
                                        </div>
                                    ))}

                                    {/* Navigation buttons */}
                                    <div className="PDAvisPagination">
                                        {page > 0 && (
                                            <button className="PDAvisShowMore" onClick={() => setPage(p => p - 1)}>
                                                ← Précédent
                                            </button>
                                        )}
                                         
                                        {(page + 1) * 5 < avis.length && (
                                            <button className="PDAvisShowMore" onClick={() => setPage(p => p + 1)}>
                                                Suivant ({avis.length - (page + 1) * 5}) →
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right — submit review */}
                        <div className="PDAvisRight">
                            <h3 className="PDAvisTitle">SOYEZ LE PREMIER À LAISSER VOTRE AVIS SUR "{product.name.toUpperCase()}"</h3>
                            <p className="PDAvisSubtitle">Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont indiqués avec <span style={{color:"#e53935"}}>*</span></p>

                            <div className="PDAvisForm">
                                <label className="PDAvisLabel">Votre note <span style={{color:"#e53935"}}>*</span></label>
                                <div className="PDAvisStarSelect">
                                    {[1,2,3,4,5].map((star) => (
                                        <span
                                            key={star}
                                            className={`PDAvisStar ${star <= selectedScore ? "filled" : ""}`}
                                            onClick={() => setSelectedScore(star)}
                                        >★</span>
                                    ))}
                                </div>

                                

                                <label className="PDAvisLabel">Votre avis <span style={{color:"#e53935"}}>*</span></label>
                                <textarea
                                    className="PDAvisTextarea"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    rows={5}
                                    placeholder="Écrivez votre avis..."
                                />

                                <button className="PDAvisSubmit" onClick={submitAvis}>
                                    Soumettre l'avis
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default ProductPage;
