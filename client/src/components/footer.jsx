import NavLinks from "./navLinks";
import './footer.css'

export default function Footer() {
    return(
        <div className="footer">
            <strong>Trixx Solutions</strong>
            <p>Professional electrical services you can trust. Licensed and available 24/7.</p>
            <div className="footNav">
                <strong>Quick Links</strong>
                <NavLinks />
            </div>
            
            <div>
            <strong>Our Services</strong>
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

            <div>
                <strong>Contact Us</strong>
                <p>Location: Kiambu-Ndumberi Road</p>
                <p>Phone: 0706571416</p>
                <p>Email: trixxsolutions@gmail.com</p>
            </div>

        </div>
    )
}