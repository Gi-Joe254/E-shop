import Hamburger from "hamburger-react"
import { useState } from "react"
import NavLinks from "./navLinks"
import './nav.css'

export default function Nav() {
    const [isOpen, setOpen] = useState(false)
    const Links = ()=> (
        <>
            <div>Services</div>
            <div>Products</div>
            <div>Reviews</div>
            <div>Contact</div>
            <button>Get Free Qoute</button>
        </>
    )
    return(
        <>
        <nav className="desktopNav">
            <h4>Trixx Solutions</h4>
            <Links />
        </nav>
        <nav className="mobileNav">
            <h2>Trixx Solutions</h2>
            <Hamburger 
                toggled={isOpen} 
                toggle={setOpen}
                size={20}
                rounded
            />
            
            
        </nav>
        <div 
            className= {`dropdown ${isOpen ? "open" : ""}`}
            style={{maxHeight: isOpen ? '50vh': '0'}}
        >
            {isOpen && <Links />}
        </div>
        
        </>
    )
}