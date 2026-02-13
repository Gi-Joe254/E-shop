import Hamburger from "hamburger-react"
import { useState } from "react"
import NavLinks from "./navLinks"
import './nav.css'

export default function Nav() {
    const [isOpen, setOpen] = useState(false)
    
    return(
        <>
        <nav className="desktopNav">
            <NavLinks />
        </nav>
        <nav className="mobileNav">
            <p>Trixx Solutions</p>
            <Hamburger 
                toggled={isOpen} 
                toggle={setOpen}
                size={20}
                rounded
            />
            {isOpen && <NavLinks />}
        </nav>
        
        </>
    )
}