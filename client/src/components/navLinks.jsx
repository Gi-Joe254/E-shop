import { NavLink } from "react-router-dom";
import "./navLinks.css"

export default function NavLinks() {
    return(
        <div className="navLinks">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/Contact">ContactUs</NavLink>
        </div>
    )
}