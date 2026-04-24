import { NavLink } from "react-router-dom";
import "./navLinks.css"
import { FaBolt } from "react-icons/fa";

export default function NavLinks() {
    return(
        <div className="pageNav">
            <h1 className="logo"><FaBolt /> Trixx Solutions</h1>

            <div className="navLinks">
                <NavLink to="/">Back to Home</NavLink>
                {/*<NavLink 
                    to="/services" 
                    className={({isActive})=> isActive? 'active': ''}
                >
                    Services
                </NavLink>*/}

                <NavLink 
                    to="/products"
                    className={({isActive})=> isActive? 'active': ''}
                >
                    Products
                </NavLink>
                {/*<NavLink to="/about">About</NavLink>
                <NavLink to="/Contact">ContactUs</NavLink>*/}
            </div>
        </div>
    )
}