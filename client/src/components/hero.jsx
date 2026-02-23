import { FaPhone } from "react-icons/fa"
import "./hero.css"

export default function Hero({contRef}) {
    return(
        <section className="hero">
            <h1>Expert Electrical Services You Can Trust</h1>
            <p>Licensed & Available 24/7 for Emergency Repairs</p>
            <div className="heroBtns">
                
                <button className="callBtn">
                    <a href="tel:+254706571416"><FaPhone />  Call Now (0706571416)</a>
                </button>

                <button 
                    className="quoteBtn"
                    onClick={()=> {contRef.current.scrollIntoView()}}
                >
                    Get Free Quote
                </button>
            </div>
            
        </section>
    )
}