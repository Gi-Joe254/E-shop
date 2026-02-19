import { FaPhone } from "react-icons/fa"
import "./hero.css"

export default function Hero() {
    return(
        <section className="hero">
            <h1>Expert Electrical Services You Can Trust</h1>
            <p>Licensed & Available 24/7 for Emergency Repairs</p>
            <div className="heroBtns">
                <button className="callBtn"><FaPhone />  Call Now</button>
                <button className="quoteBtn">Get Free Quote</button>
            </div>
            
        </section>
    )
}