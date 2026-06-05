import { FaPhone } from "react-icons/fa"
import "./hero.css"
import { motion } from "framer-motion"

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
    }
}

const hoverVars = {
    whileHover: {
        y: -4,
        scale: 1.02,
        transition: {
            duration: 0.25
        }
    },
    whileTap: {
        scale: 0.98
    }
}

export default function Hero({contRef}) {
    return(
        <motion.section 
            className="hero" 
            variants={sectionVars}
            initial='hidden'
            animate='visible'
        >
            <motion.h1 variants={headerVars}>Expert Electrical Services You Can Trust</motion.h1>
            <motion.p variants={textVars}>Licensed & Available 24/7 for Emergency Repairs</motion.p>
            <motion.div 
                className="heroBtns"
                variants={buttonVars}
            >                
                <motion.button 
                    className="callBtn"
                    variants={hoverVars}
                    whileHover='whileHover'
                    whileTap='whileTap'
                >
                    <a href="tel:+254706571416"><FaPhone />  Call Now (0706571416)</a>
                </motion.button>

                <motion.button 
                    className="quoteBtn"
                    onClick={()=> {contRef.current.scrollIntoView()}}
                    variants={hoverVars}
                    whileHover='whileHover'
                    whileTap='whileTap'
                >
                    Get Free Quote
                </motion.button>
            </motion.div>
            
        </motion.section>
    )
}