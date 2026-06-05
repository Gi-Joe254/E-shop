import NavLinks from "./navLinks";
import './footer.css'
import { FaBolt, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { handleRef } from "../services/handleRef";
import { motion } from 'framer-motion'

const sectionVars = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.7,
            staggerChildren: 0.12
        }
    }
}

const headerVars = {
    hidden: {
        opacity: 0,
        y: -15
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
}

const textVars = {
    hidden: {
        opacity: 0,
        y: 10
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
}

const buttonVars = {
    hidden: {
        opacity: 0,
        y: 10
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    },
    whileHover: {
        y: -4,
        scale: 1.02,
        transition: {
            duration: 0.25
        }
    }
}

const cardVars = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
}

const imgVars = {
    hidden: {
        opacity: 0,
        scale: 0.98
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: "easeOut"
        }
    }
}

export default function Footer({servRef, prodRef, revRef, contRef}) {
    
    return(
        <motion.div 
            className="footer"
            variants={sectionVars}
            initial='hidden'
            whileInView='visible'
            viewport={{once: true, amount:0.3}}
        >
            <motion.h1 variants={headerVars} className="logo"><FaBolt /> Trixx Solutions</motion.h1>
            <motion.p variants={textVars}>Professional electrical services you can trust. Licensed and available 24/7.</motion.p>
            <motion.div className="footNav">
                <motion.h4 variants={headerVars}>Quick Links</motion.h4>
                <motion.p variants={textVars} onClick={()=> {handleRef(servRef)}}>Our Services</motion.p>
                <motion.p variants={textVars} onClick={()=> {handleRef(prodRef)}}>Featured Products</motion.p>
                <motion.p variants={textVars} onClick={()=> {handleRef(revRef)}}>What Our Customers Say</motion.p>
                <motion.p variants={textVars} onClick={()=> {handleRef(contRef)}}>Contact Us</motion.p>
                
            </motion.div>
            
            <motion.div className="serviceList">
            <motion.h4 variants={headerVars}>Our Services</motion.h4>
                <motion.ul variants={textVars}>
                    <li>Electrical Repairs</li>
                    <li>Panel Upgrades</li>
                    <li>Lighting Solutions</li>
                    <li>Gadget Repairs</li>
                    <li>Elecrical Repairs</li>
                    <li>Car Sound Installation</li>
                    <li>Emergency Service</li>
                </motion.ul>
            </motion.div>

            <motion.div className="contactList">
                <motion.h4 variants={headerVars}>Contact Us</motion.h4>
                <motion.p variants={textVars}>Location: Kiambu-Ndumberi Road</motion.p>
                <motion.p variants={textVars}>Phone: 0706571416</motion.p>
                <motion.p variants={textVars}>Email: trixxsolutions@gmail.com</motion.p>
            </motion.div>
            <motion.div className="footEnd">
                <motion.div variants={imgVars} className="socials">
                    <FaFacebook />
                    <FaTwitter />
                    <FaWhatsapp />
                    <FaInstagram />
                </motion.div>
                <motion.div variants={textVars} className="rights">
                    <p>@ 2026 Trixx Solutions. All rights reserved</p>
                </motion.div>
            </motion.div>
            
        </motion.div>
    )
}