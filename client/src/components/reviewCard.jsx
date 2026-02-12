export default function Review({name, location, message, rating}) {
    return(
        <div className="reviewContainer">
            <strong>{name}</strong>
            <p>{location}</p>
            <p>{message}</p>
            <p>{rating}</p>
        </div>
    )
}