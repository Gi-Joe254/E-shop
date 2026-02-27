import Hamburger from "hamburger-react"
import { useState } from "react"
import './nav.css'
import { FaBolt, FaMoon, FaSun } from "react-icons/fa"
import { handleRef } from "../services/handleRef"

export default function Nav({servRef, prodRef, revRef, contRef}) {
    const [isOpen, setOpen] = useState(false)
    const [isDark, setDark] = useState(false)

    const handleMode = ()=> {
        document.documentElement.classList.toggle('dark')
        setDark(prev => !prev)
    }
    
    const Links = ()=> (
        <>
            <div onClick= {()=> {handleRef(servRef), setOpen(false)}}>Services</div>
            <div onClick= {()=> {handleRef(prodRef), setOpen(false)}}>Products</div>
            <div onClick = {()=> {handleRef(revRef), setOpen(false)}}>Reviews</div>
            <div onClick= {()=> {handleRef(contRef), setOpen(false)}}>Contact</div>
            

            <button className="quoteBtn" onClick={()=> {handleRef(contRef)}}>Get Free Qoute</button>
            <div className="darkMode" onClick={handleMode}>
                {isDark ? <FaSun />:<FaMoon />}
            </div>
        </>
    )
    return(
        <div className="navBar">
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
        
        </div>
    )
}