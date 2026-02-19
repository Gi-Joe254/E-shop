import Comms from "./comms"
import "./contact.css"

export default function ContactUs({handleSubmit, service, setService, customer, setCustomer}) {
   
  
    return(
        <div className="contactContainer">
            <h1>Contact Us</h1>
            <p>Get in touch with our team for a free consultation</p>
            <div className="contactWrapper">
                <form className="contactForm" onSubmit={handleSubmit}>
                    <strong>Send us a message</strong>
                    <p>Fill out the form below and we'll respond within 24 hours</p>
                    <div className="customerDetails">
                        <input 
                            placeholder="Your Name"
                            type='text' name='name' id='name' value={customer.name} 
                            onChange={(e)=> {setCustomer({...customer, name: e.target.value})}}
                            required
                        />

                        <input 
                            placeholder="Email Address"
                            type='email' name='email' id='email' value={customer.email}
                            onChange={(e)=> {setCustomer({...customer, email: e.target.value})}}
                            required
                        />

                        <input 
                            placeholder="Phone Number"
                            type='tel' name='telephone' id='telephone' value={customer.telephone}
                            onChange={(e)=> {setCustomer({...customer, telephone: e.target.value})}}
                            required
                        />

                        <select required
                            name="location" id="location" value={customer.location}
                            onChange={(e)=> {setCustomer({...customer, location: e.target.value})}}
                        >
                            <option defaultValue=''>Select Location</option>
                            <option value='Kiambu'>Kiambu</option>
                            <option value='Nairobi'>Nairobi</option>
                            <option value='Thika'>Thika</option>
                            <option value='Limuru'>Limuru</option>
                            <option value='Thika-Road'>Thika-Road</option>
                        </select>
                    </div>
                    <div className="service">
                        <select required
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
                        </select>
                
                        <textarea 
                            placeholder="Tell us more about the issue"
                            name="description" id="description" cols={50} rows={4} value={service.description} 
                            onChange={(e)=> {setService({...service, description: e.target.value})}}
                            required
                        />
                    </div>
                    
                    <button type="submit">Submit</button>
                </form>
            
                <Comms />
            
            </div>
            
        </div>
    )
}