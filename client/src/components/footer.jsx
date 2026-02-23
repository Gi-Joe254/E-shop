import NavLinks from "./navLinks";
import './footer.css'
import { FaBolt, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { handleRef } from "../services/handleRef";

export default function Footer({servRef, prodRef, revRef, contRef}) {
    
    return(
        <div className="footer">
            <h1 className="logo"><FaBolt /> Trixx Solutions</h1>
            <p>Professional electrical services you can trust. Licensed and available 24/7.</p>
            <div className="footNav">
                <h4>Quick Links</h4>
                <p onClick={()=> {handleRef(servRef)}}>Our Services</p>
                <p onClick={()=> {handleRef(prodRef)}}>Featured Products</p>
                <p onClick={()=> {handleRef(revRef)}}>What Our Customers Say</p>
                <p onClick={()=> {handleRef(contRef)}}>Contact Us</p>
                
            </div>
            
            <div className="serviceList">
            <h4>Our Services</h4>
                <ul>
                    <li>Electrical Repairs</li>
                    <li>Panel Upgrades</li>
                    <li>Lighting Solutions</li>
                    <li>Gadget Repairs</li>
                    <li>Elecrical Repairs</li>
                    <li>Car Sound Installation</li>
                    <li>Emergency Service</li>
                </ul>
            </div>

            <div className="contactList">
                <h4>Contact Us</h4>
                <p>Location: Kiambu-Ndumberi Road</p>
                <p>Phone: 0706571416</p>
                <p>Email: trixxsolutions@gmail.com</p>
            </div>
            <div className="footEnd">
                <div className="socials">
                    <FaFacebook />
                    <FaTwitter />
                    <FaWhatsapp />
                    <FaInstagram />
                </div>
                <div className="rights">
                    <p>@ 2026 Trixx Solutions. All rights reserved</p>
                </div>
            </div>
            
        </div>
    )
}