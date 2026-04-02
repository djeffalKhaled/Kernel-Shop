import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="Footer">
            <div className="FooterMain">

                
                <div className="FooterBrand">
                    <div className="FooterLogo">
                        <span className="FooterLogoArrow">&gt;</span>
                        <span className="FooterLogoKer">Ker</span>
                        <span className="FooterLogoCursor">_</span>
                        <span className="FooterLogoNel">nel</span>
                    </div>
                    <p className="FooterDesc">
                        Ker_nel est votre marketplace de confiance pour l'achat et la vente de matériel informatique en Algérie. Découvrez une large gamme de produits tech de qualité, avec des prix compétitifs et un service client réactif.
                    </p>
                    <div className="FooterSocials">
                        <a href="#" className="FooterSocialBtn" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        </a>
                        <a href="#" className="FooterSocialBtn" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        </a>
                        <a href="https://wa.me/213555000001" className="FooterSocialBtn" aria-label="WhatsApp">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                        </a>
                    </div>
                </div>

                {/* Middle — Contact info */}
                <div className="FooterContact">
                    <h3 className="FooterSectionTitle">Informations</h3>
                    <ul className="FooterInfoList">
                        <li>
                            <span className="FooterInfoIcon">📞</span>
                            <span>0555 000 001 / 0560 000 002</span>
                        </li>
                        <li>
                            <span className="FooterInfoIcon">✉️</span>
                            <span>contact@ker-nel.dz</span>
                        </li>
                        <li>
                            <span className="FooterInfoIcon">💬</span>
                            <span>WhatsApp: +213 555 000 001</span>
                        </li>
                        <li>
                            <span className="FooterInfoIcon">📍</span>
                            <span>USTHB, Bab Ezzouar, 16111 Alger</span>
                        </li>
                    </ul>
                </div>

                {/* Right — Map */}
                <div className="FooterMap">
                    <h3 className="FooterSectionTitle">Localisation</h3>
                    <div className="FooterMapWrapper">
                        <iframe
                            title="USTHB Bab Ezzouar"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.134!2d3.1635!3d36.7206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb1d7ab4de4c1%3A0x3e3e3e3e3e3e3e3e!2sUSHTB%20Bab%20Ezzouar!5e0!3m2!1sfr!2sdz!4v1700000000000!5m2!1sfr!2sdz"
                            width="100%"
                            height="200"
                            style={{ border: 0, borderRadius: "12px" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="FooterBottom">
                <span>Ker_nel © {new Date().getFullYear()} — Tous droits réservés</span>
                <span>Développé en Algérie</span>
            </div>
        </footer>
    );
}

export default Footer;
