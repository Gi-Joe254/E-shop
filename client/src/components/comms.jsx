import "./comms.css"
import { FaClock, FaLocationArrow, FaMailBulk, FaPhone, FaRegMap } from 'react-icons/fa'

export default function Comms() {
    return(
        <div className="comms">
            <div>
                <FaPhone />
                <div className="commsText">
                    <strong>Phone</strong>
                    <p>0706571416</p>
                    <p>24/7 Emergency Line</p>
                </div>  
            </div>

            <div>
                <FaMailBulk />
                <div className="commsText">
                    <strong>Email</strong>
                    <p>trixxsolutions@gmail.com</p>
                    <p>We reply within 24 hours</p> 
                </div>
            </div>

            <div>
                <FaLocationArrow />
                <div className="commsText">
                    <strong>Kiambu town</strong>
                    <p>opposite Hunton heights</p>
                </div>
            </div>
            <div>
                <FaClock />
                <div className="commsText">
                    <strong>Business Hours</strong>
                    <p>Mon-Sat: 8:00 AM - 20:00 PM</p>
                    <p>Sun: Emergency only</p>
                </div>
            </div>
            
        </div>
    )
}