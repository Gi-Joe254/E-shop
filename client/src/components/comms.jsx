import "./comms.css"
import { FaClock, FaLocationArrow, FaMailBulk, FaPhone, FaRegMap } from 'react-icons/fa'

export default function Comms() {
    return(
        <div className="comms">
            <div>
                <FaPhone />
                <div className="commsText">
                    <h4>Phone</h4>
                    <p>0706571416</p>
                    <p>24/7 Emergency Line</p>
                </div>  
            </div>

            <div>
                <FaMailBulk />
                <div className="commsText">
                    <h4>Email</h4>
                    <p>trixxsolutions@gmail.com</p>
                    <p>We reply within 24 hours</p> 
                </div>
            </div>

            <div>
                <FaLocationArrow />
                <div className="commsText">
                    <h4>Kiambu town</h4>
                    <p>opposite Hunton heights</p>
                </div>
            </div>
            <div>
                <FaClock />
                <div className="commsText">
                    <h4>Business Hours</h4>
                    <p>Mon-Sat: 8:00 AM - 20:00 PM</p>
                    <p>Sun: Emergency only</p>
                </div>
            </div>
            
        </div>
    )
}