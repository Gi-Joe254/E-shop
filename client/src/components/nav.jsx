import Hamburger from "hamburger-react"
import { useState } from "react"
import './nav.css'
import { FaBolt, FaMoon, FaSun } from "react-icons/fa"
import { handleRef } from "../services/handleRef"
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


export default function Nav({servRef, prodRef, revRef, contRef}) {
    const [isOpen, setOpen] = useState(false)
    const [isDark, setDark] = useState(false)

    const handleMode = ()=> {
        document.documentElement.classList.toggle('dark')
        setDark(prev => !prev)
    }
    
    const Links = ()=> (
        <>
        
            <motion.div variants={textVars} onClick= {()=> {handleRef(servRef), setOpen(false)}}>Services</motion.div>
            <motion.div variants={textVars} onClick= {()=> {handleRef(prodRef), setOpen(false)}}>Products</motion.div>
            <motion.div variants={textVars} onClick = {()=> {handleRef(revRef), setOpen(false)}}>Reviews</motion.div>
            <motion.div variants={textVars} onClick= {()=> {handleRef(contRef), setOpen(false)}}>Contact</motion.div>
        
            

            <motion.button variants={buttonVars} initial='hidden' animate='visible' whileHover='whileHover' className="quoteBtn" onClick={()=> {handleRef(contRef)}}>Get Free Qoute</motion.button>
            <motion.div variants={imgVars} className="darkMode" onClick={handleMode}>
                {isDark ? <FaSun />:<FaMoon />}
            </motion.div>
        </>
    )
    return(
        <motion.div 
            className="navBar"
            variants={sectionVars}
            initial='hidden'
            animate='visible'
        >
            <nav className="desktopNav">
                <motion.h1 className="logo" variants={headerVars}><FaBolt /> Trixx Solutions</motion.h1>
                <Links />
            </nav>

            <nav className="mobileNav">
                <motion.h1 className="logo" variants={headerVars}><FaBolt /> Trixx Solutions</motion.h1>
                <motion.div variants={imgVars}>
                    <Hamburger 
                        toggled={isOpen} 
                        toggle={setOpen}
                        size={20}
                    />
                </motion.div>
                
            </nav>
            <motion.div 
                className= {`dropdown ${isOpen ? "open" : ""}`}
                style={{maxHeight: isOpen ? '50vh': '0'}}
                variants={cardVars}
            >
                {isOpen && <Links />}
            </motion.div>
        
        </motion.div>
    )
}