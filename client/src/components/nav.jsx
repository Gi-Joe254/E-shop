import { NavLink } from "react-router-dom"

export default function Nav() {
    return(
       <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/Contact">ContactUs</NavLink>
        </nav>
    )
}