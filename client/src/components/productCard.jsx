export default function Product({imgSrc, imgAlt, name, description, price}) {
    return(
        <div className="productContainer">
            <img src={imgSrc} alt={imgAlt}/>
            <strong>{name}</strong>
            <p>{description}</p>
            <p>{price}</p>
            <button>Add to Cart</button>
        </div>

    )
}