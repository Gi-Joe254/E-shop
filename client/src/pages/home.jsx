import { useState } from "react";
import ContactUs from "../components/contact";
import Hero from "../components/hero";
import Nav from "../components/nav";
import Product from "../components/productCard";
import Review from "../components/reviewCard";
import Service from "../components/serviceCard";
import { useEffect } from "react";
import Footer from "../components/footer";

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
                <Service
                    imgSrc= ''
                    imgAlt= 'repairs image'
                    name= 'Electrical Repairs'
                    description= 'Quick and reliable fixes for all elctrical issues in your home or business.'
                />
                <Service 
                    imgSrc= ''
                    imgAlt= 'upgrades image'
                    name= 'Panel Upgrades'
                    description= 'Modern electrical panel installations to handle your power needs.'
                />
                <Service
                    imgSrc= ''
                    imgAlt= 'lighting image'
                    name= 'Lighting Solutions'
                    description= 'Interior and exterior lighting solutions for enhanced ambiance and security'
                />
                <Service 
                    imgSrc= ''
                    imgAlt= 'gadget image'
                    name= 'Gadget Repairs'
                    description= 'Fast and reliable repairs for your phone, TV, and laptop'
                />
                <Service 
                    imgSrc= ''
                    imgAlt= 'repairs image'
                    name= 'Electrical Repairs'
                    description= 'Quick and reliable fixes for all elctrical issues in your home or business'
                />
                <Service 
                    imgSrc= ''
                    imgAlt= 'sound image'
                    name= 'Car Sound Installation'
                    description= 'Professional car sound system installation to upgrade your ride with good music'
                />
                <Service 
                    imgSrc= ''
                    imgAlt= 'emergency image'
                    name= '24/7 Emergency Service'
                    description= 'Round-the-clock availability for urgent electrial issues'
                />
            </section>
            <section className="products">
                <h1>Featured Products</h1>
                <p>High-quality electrical products for all your needs</p>
                <Product
                    imgSrc=''
                    imgAlt='bulbs image'
                    name='LED Light Bulbs'
                    description='Energy-efficient LED bulbs'
                    price='From Ksh.100'
                />
                <Product
                    imgSrc=''
                    imgAlt='sound image'
                    name='Sound Sytems'
                    description='Premium and high-quality sound systems'
                    price='From Ksh.10,000'
                />
                <Product
                    imgSrc=''
                    imgAlt='TV image'
                    name='Pre-owned TVs'
                    description='Refurbished Television sets'
                    price='From Ksh.5000'
                />
                <Product
                    imgSrc=''
                    imgAlt='wire image'
                    name='Electrical wires'
                    description='Essential and professional grade electrical wires'
                    price='From Ksh.50'
                />
            </section>
            <section className="reviews">
                <h1>What Our Customers Say</h1>
                <p>Don't just take our word for it - see what our satisfied customers have to say</p>
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
            </section>
            <section className="contactUs">
                 <ContactUs 
                    handleSubmit={handleSubmit}
                    customer={customer}
                    setCustomer={customer}
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