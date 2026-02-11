import "../styles/CategorieBar.css"

function CategorieBar() {
  
  return (
    <>
        <div className = "CategorieBar">
            <div className="Title">{"> COMPOSANTS PC"}</div>
            <ul className = "List">
                <li>CPU</li>
                <li>Carte Mére</li>
                <li>RAM</li>
                <li>GPU</li>
                <li>Boitiers</li>
                <li>Alimentation</li>
                <li>Stockage</li>
                <li>Refroidissement</li>
            </ul>

        </div>
      
    </>
  )
}

export default CategorieBar
