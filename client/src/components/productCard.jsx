import "./productCard.css"

export default function Product({imgSrc, imgAlt, name, description, price}) {
    return(
        <div className="productContainer">
            <img src={imgSrc} alt={imgAlt}/>
            <div className="productText">
                <strong>{name}</strong>
                <p>{description}</p>
                <p>{price}</p>
            </div>
            <button>Add to Cart</button>
        </div>

    )
}