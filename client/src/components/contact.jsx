import Comms from "./comms"
import "./contact.css"
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

export default function ContactUs({handleSubmit, service, setService, customer, setCustomer}) {
   
    return(
        <motion.div 
            className="contactContainer"
            variants={sectionVars}
            initial='hidden'
            whileInView='visible'
            viewport={{once: true, amount: 0.3}}
        >
            <motion.h1 variants={headerVars}>Contact Us</motion.h1>
            <motion.p variants={textVars}>Get in touch with our team for a free consultation</motion.p>
            <motion.div className="contactWrapper" variants={cardVars}>
                <form className="contactForm" onSubmit={handleSubmit}>
                    <motion.strong variants={headerVars}>Send us a message</motion.strong>
                    <motion.p variants={textVars}>Fill out the form below and we'll respond within 24 hours</motion.p>
                    <motion.div className="customerDetails">
                        <motion.input 
                            variants={cardVars}
                            placeholder="Your Name"
                            type='text' name='name' id='name' value={customer.name} 
                            onChange={(e)=> {setCustomer({...customer, name: e.target.value})}}
                            required
                        />

                        <motion.input 
                            variants={cardVars}
                            placeholder="Email Address"
                            type='email' name='email' id='email' value={customer.email}
                            onChange={(e)=> {setCustomer({...customer, email: e.target.value})}}
                            required
                        />

                        <motion.input
                            variants={cardVars} 
                            placeholder="Phone Number"
                            type='tel' name='telephone' id='telephone' value={customer.telephone}
                            onChange={(e)=> {setCustomer({...customer, telephone: e.target.value})}}
                            required
                        />

                        <motion.select 
                            variants={cardVars}
                            required
                            name="location" id="location" value={customer.location}
                            onChange={(e)=> {setCustomer({...customer, location: e.target.value})}}
                        >
                            <option defaultValue=''>Select Location</option>
                            <option value='Kiambu'>Kiambu</option>
                            <option value='Nairobi'>Nairobi</option>
                            <option value='Thika'>Thika</option>
                            <option value='Limuru'>Limuru</option>
                            <option value='Thika-Road'>Thika-Road</option>
                        </motion.select>
                    </motion.div>
                    <motion.div className="service">
                        <motion.select 
                            variants={cardVars}
                            required
                            name="service" id="service" value={service.type} 
                            onChange={(e)=> {setService({...service, type: e.target.value})}}
                        >
                            <option defaultValue=''>Select Service</option>
                            <option value='installation'>Electrical installation</option>
                            <option value='maintenance'>Electrical repairs</option>
                            <option value='lighting'>Lighting solutions</option>
                            <option value='gadgetRepair'>Gadget repair</option>
                            <option value='soundSystem'>Sound system</option>
                            <option value='emergency'>Emergency services</option>
                        </motion.select>
                
                        <motion.textarea
                            variants={cardVars}
                            placeholder="Tell us more about the issue"
                            name="description" id="description" cols={50} rows={4} value={service.description} 
                            onChange={(e)=> {setService({...service, description: e.target.value})}}
                            required
                        />
                    </motion.div>
                    
                    <motion.button variants={buttonVars} type="submit">Submit</motion.button>
                </form>
            
                <Comms />
            
            </motion.div>
            
        </motion.div>
    )
}