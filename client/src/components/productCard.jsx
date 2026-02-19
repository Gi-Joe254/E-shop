import "./productCard.css"

export default function Product({imgSrc, imgAlt, name, description, price}) {
    return(
        <div className="productContainer">
            <img src={imgSrc} alt={imgAlt}/>
            <div className="productText">
                <h3>{name}</h3>
                <p>{description}</p>
                <p className="price">{price}</p>
            </div>
            <button>Add to Cart</button>
        </div>

    )
}