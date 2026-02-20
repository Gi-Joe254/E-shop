import Hamburger from "hamburger-react"
import { useState } from "react"
import NavLinks from "./navLinks"
import './nav.css'
import { FaBolt } from "react-icons/fa"

export default function Nav() {
    const [isOpen, setOpen] = useState(false)
    const Links = ()=> (
        <>
            <div>Services</div>
            <div>Products</div>
            <div>Reviews</div>
            <div>Contact</div>
            <button className="quoteBtn">Get Free Qoute</button>
        </>
    )
    return(
        <>
        <nav className="desktopNav">
            <h1 className="logo"><FaBolt /> Trixx Solutions</h1>
            <Links />
        </nav>
        <nav className="mobileNav">
            <h1 className="logo"><FaBolt /> Trixx Solutions</h1>
            <Hamburger 
                toggled={isOpen} 
                toggle={setOpen}
                size={20}
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