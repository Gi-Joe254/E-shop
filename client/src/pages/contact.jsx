import { useEffect, useState } from "react";
import Nav from "../components/nav";

export default function ContactUs() {
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
            <Nav />
            <header>ContactUs Page</header>
            <form onSubmit={handleSubmit}>
                <div className="service">
                    <label htmlFor="service">Select service:</label>
                    <select 
                        name="service" id="service" value={service.type} 
                        onChange={(e)=> {setService({...service, type: e.target.value})}}
                    >
                        <option defaultValue=''>--select service--</option>
                        <option value='installation'>Electrical installation</option>
                        <option value='maintenance'>Electrical maintenance</option>
                        <option value='applianceRepair'>Home appliance repair</option>
                        <option value='phoneRepair'>Phone repair</option>
                        <option value='TVRepair'>TV repair</option>
                        <option value='TVMounting'>TV mounting</option>
                    </select>
                    <label htmlFor="description">Describe the issue:</label>
                    <textarea 
                        name="description" id="description" cols={50} rows={4} value={service.description} 
                        onChange={(e)=> {setService({...service, description: e.target.value})}}
                    />
                </div>
                <div className="customerDetails">
                    <label htmlFor="name">Name</label>
                    <input 
                        type='text' name='name' id='name' value={customer.name} 
                        onChange={(e)=> {setCustomer({...customer, name: e.target.value})}}
                    />

                    <label htmlFor="email">E-mail</label>
                    <input 
                        type='email' name='email' id='email' 
                        onChange={(e)=> {setCustomer({...customer, email: e.target.value})}}
                    />

                    <label htmlFor="telephone">Phone Number</label>
                    <input 
                        type='number' name='telephone' id='telephone' 
                        onChange={(e)=> {setCustomer({...customer, telephone: e.target.value})}}
                    />

                    <label htmlFor="location">Location</label>
                    <select 
                        name="location" id="location" value={customer.location}
                        onChange={(e)=> {setCustomer({...customer, location: e.target.value})}}
                    >
                        <option defaultValue=''>--select location--</option>
                        <option value='Kiambu'>Kiambu</option>
                        <option value='Nairobi'>Nairobi</option>
                        <option value='Thika'>Thika</option>
                        <option value='Limuru'>Limuru</option>
                        <option value='Thika-Road'>Thika-Road</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
            {submitMessage && <div className={submitMessage.type}>{submitMessage.text}</div>}
        </>
    )
}