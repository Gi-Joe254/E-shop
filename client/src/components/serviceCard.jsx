import "./serviceCard.css"

export default function Service({imgSrc, imgAlt, name, description}) {
    return(
        <div className="serviceContainer">
            <img src={imgSrc} alt={imgAlt}/>
            <div className="serviceText">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </div>

    )
}