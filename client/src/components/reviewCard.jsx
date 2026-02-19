import "./reviewCard.css"

export default function Review({name, location, message, rating}) {
    return(
        <div className="reviewContainer">
            <h4>{name}</h4>
            <h5>{location}</h5>
            <p>{message}</p>
            <p className="rating">{rating}</p>
        </div>
    )
}