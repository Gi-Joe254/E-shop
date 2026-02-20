import { useState } from "react";
import ContactUs from "../components/contact";
import Hero from "../components/hero";
import Nav from "../components/nav";
import Product from "../components/productCard";
import Review from "../components/reviewCard";
import Service from "../components/serviceCard";
import { useEffect } from "react";
import Footer from "../components/footer";
import "./home.css"
import soundImg from "../assets/images/services/sound-image.jpg"
import emergencyImg from "../assets/images/services/emergency-image.jpg"
import gadgetImg from "../assets/images/services/gadget-image.jpg"
import lightsImg from "../assets/images/services/lights-image.png"
import panelImg from "../assets/images/services/panel-image.jpg"
import repairsImg from "../assets/images/services/repairs-image.jpg"
import lightImg2 from "../assets/images/products/lights-image.jpg"
import tvImg from "../assets/images/products/tv-image.avif"
import wireImg from "../assets/images/products/wires-image.jpg"

export default function Home() {
    const [isOpen, setOpen] = useState(false)
    const [service, setService] = useState({type: '', description:''})
    const [customer, setCustomer] = useState({name:'', email:'', telephone:'', location:''})
    const [submitMessage, setSubmitMessage] = useState()

    useEffect(()=> {
        //set timeout for ui message
        if(!submitMessage) return
        const timer = setTimeout(() => {
            setSubmitMessage(null)
        }, 2000);
        return ()=> {
            clearTimeout(timer)
        }
    },[submitMessage])
 
    const handleSubmit = async(e)=> {
        e.preventDefault()
        const load = {...service, ...customer}
        try {
            const res = await fetch('http://localhost:3000/api/customerReq', {
                method: 'POST',
                headers: {'Content-Type': 'Application/json'},
                body: JSON.stringify(load)
            })
            const data = await res.json()
            
            if(!res.ok) {
                setSubmitMessage({text: data.message, type: 'error'})
                return
            }
            
            setSubmitMessage({text: data.message, type: 'success'})

        } catch (error) {
            setSubmitMessage({text: 'Network error, try again', type: 'error'})
        } finally {
            setService({type:'', description:''})
        }
       
    }   

    return(
        <>
            <Nav 
                isOpen={isOpen}
                setOpen={setOpen}
            />
            <Hero />
            <section className="services">
                <h1>Our Services</h1>
                <p>Professional electrical solutions for residential and commercial properties</p>
                <div className="serviceCards">
                    <Service
                        imgSrc= {repairsImg}
                        imgAlt= 'repairs image'
                        name= 'Electrical Repairs'
                        description= 'Quick and reliable fixes for all elctrical issues in your home or business.'
                    />
                    <Service 
                        imgSrc= {panelImg}
                        imgAlt= 'upgrades image'
                        name= 'Panel Upgrades'
                        description= 'Modern electrical panel installations to handle your power needs.'
                    />
                    <Service
                        imgSrc= {lightsImg}
                        imgAlt= 'lighting image'
                        name= 'Lighting Solutions'
                        description= 'Interior and exterior lighting solutions for enhanced ambiance and security'
                    />
                    <Service 
                        imgSrc= {gadgetImg}
                        imgAlt= 'gadget image'
                        name= 'Gadget Repairs'
                        description= 'Fast and reliable repairs for your phone, TV, and laptop'
                    />
                    <Service 
                        imgSrc= {soundImg}
                        imgAlt= 'sound image'
                        name= 'Car Sound Installation'
                        description= 'Professional car sound system installation to upgrade your ride with good music'
                    />
                    <Service 
                        imgSrc= {emergencyImg}
                        imgAlt= 'emergency image'
                        name= '24/7 Emergency Service'
                        description= 'Round-the-clock availability for urgent electrial issues'
                    />
                </div>
            </section>
            <section className="products">
                <h1>Featured Products</h1>
                <p>High-quality electrical products for all your needs</p>
                <div className="productCards">
                    <Product
                        imgSrc= {lightImg2}
                        imgAlt='bulbs image'
                        name='LED Light Bulbs'
                        description='Energy-efficient LED bulbs'
                        price='From Ksh.100'
                    />
                    <Product
                        imgSrc= {soundImg}
                        imgAlt='sound image'
                        name='Sound Sytems'
                        description='Premium and high-quality sound systems'
                        price='From Ksh.10,000'
                    />
                    <Product
                        imgSrc= {tvImg}
                        imgAlt='TV image'
                        name='Pre-owned TVs'
                        description='Refurbished Television sets'
                        price='From Ksh.5000'
                    />
                    <Product
                        imgSrc= {wireImg}
                        imgAlt='wire image'
                        name='Electrical wires'
                        description='Essential and professional grade electrical wires'
                        price='From Ksh.50'
                    />
                </div>
            </section>
            <section className="reviews">
                <h1>What Our Customers Say</h1>
                <p>Don't just take our word for it - see what our satisfied customers have to say</p>
                <div className="reviewCards">
                    <Review
                        name='Joseph Gacheru'
                        location='Kiambu'
                        message='Absolutely fantastic service! They came out the same day to fix our electrical issue. The technician was professional, knowledgeable, and very thorough. Highly recommend!'
                        rating='****'
                    />
                    <Review
                        name='Emily Anyango'
                        location='Kiambu'
                        message='Best electrician service in the area! Fair pricing, excellent communication, and top-notch work. They installed all new lighting in our office and it looks amazing.'
                        rating='*****'
                    />
                    <Review
                        name='Stephen Kamau'
                        location='Kiambu'
                        message='Very knowledgeable and professional. Highly recommend for energy-efficient upgrades'
                        rating='*****'
                    />
                </div>
            
            </section>
            <section className="contactUs">
                 <ContactUs 
                    handleSubmit={handleSubmit}
                    customer={customer}
                    setCustomer={setCustomer}
                    service={service}
                    setService={setService}
                />
            {submitMessage && <div className={submitMessage.type}>{submitMessage.text}</div>}
            </section>
            <section className='footer'>
                <Footer />
            </section>
        </>
    )
}