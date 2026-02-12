export default function Service({imgSrc, imgAlt, name, description}) {
    return(
        <div className="serviceContainer">
            <img src={imgSrc} alt={imgAlt}/>
            <strong>{name}</strong>
            <p>{description}</p>
        </div>

    )
}