import "./comms.css"
import { FaClock, FaLocationArrow, FaMailBulk, FaPhone, FaRegMap } from 'react-icons/fa'
import { motion } from 'framer-motion'

const sectionVars = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.7,
            staggerChildren: 0.2
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

export default function Comms() {
    return(
        <motion.div 
            variants={sectionVars} 
            initial='hidden'
            whileInView='visible'
            viewport={{once: true, amount: 0.3}}
            className="comms"
        >
            <motion.div variants={cardVars}>
                <FaPhone />
                <motion.div variants={textVars} className="commsText">
                    <h4>Phone</h4>
                    <p>0706571416</p>
                    <p>24/7 Emergency Line</p>
                </motion.div>  
            </motion.div>

            <motion.div variants={cardVars}>
                <FaMailBulk />
                <motion.div variants={textVars} className="commsText">
                    <h4>Email</h4>
                    <p>trixxsolutions@gmail.com</p>
                    <p>We reply within 24 hours</p> 
                </motion.div>
            </motion.div>

            <motion.div variants={cardVars}>
                <FaLocationArrow />
                <motion.div variants={textVars} className="commsText">
                    <h4>Kiambu town</h4>
                    <p>opposite Hunton heights</p>
                </motion.div>
            </motion.div>
            <motion.div variants={cardVars}>
                <FaClock />
                <motion.div variants={textVars} className="commsText">
                    <h4>Business Hours</h4>
                    <p>Mon-Sat: 8:00 AM - 20:00 PM</p>
                    <p>Sun: Emergency only</p>
                </motion.div>
            </motion.div>
            
        </motion.div>
    )
}