import "./reviewCard.css"

export default function Review({name, location, message, rating}) {
    return(
        <div className="reviewContainer">
            <strong>{name}</strong>
            <div>{location}</div>
            <p>{message}</p>
            <p>{rating}</p>
        </div>
    )
}