import Hamburger from "hamburger-react"
import { useState } from "react"
import NavLinks from "./navLinks"

export default function Nav() {
    const [isOpen, setOpen] = useState(false)
    
    return(
        <>
        <nav className="desktopNav">
            <NavLinks />
        </nav>
        <nav className="mobileNav">
            <Hamburger toggled={isOpen} toggle={setOpen}/>
            {isOpen && <NavLinks />} 
        </nav>
        
        </>
    )
}