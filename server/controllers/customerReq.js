import 'dotenv/config' 
import supabase from '../database/db.js'

export const customerReq = async(req, res)=> {
    const {type, description, name, email, telephone, location} = req.body
    
    try {
        //check if any field is empty
        const fields = {type, description, name, email, telephone, location}
        for(const [key, value] of Object.entries(fields)){
            if(!value || value.trim() === ''){
                return res.status(400).json({message:`${key} is required`})
            }
        }
        //validate email
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return res.status(400).json({ message: 'invalid email' })
        }
        if(email.length > 150){
            return res.status(400).json({ message: 'email too long' })
        }
        //validate phone number        
        if(!/^0\d{9}$/.test(telephone)){
            return res.status(400).json({message:'invalid phone number'})
        }
        //validate description
        if (description.length > 1000) {
            return res.status(400).json({ message: 'description too long' })
        }
        //validate name
        if(name.length > 100){
            return res.status(400).json({ message: 'name too long' })
        }

        //supabase
        const { data: existing, error:selectError } = await supabase
            .from('jobs')
            .select('id')
            .eq('type',type)
            .eq('description', description)
            .eq('name', name)
            .eq('telephone', telephone)
            .eq('email', email)
            .eq('location',location)
            .neq('status', 'completed')
            .maybeSingle()
        
        if (selectError) throw selectError
        if(existing) return res.status(400).json({message: 'already submitted'})
        
        const { error: insertError } = await supabase
            .from('jobs')
            .insert([
                {type, description, name, email, telephone, location}
            ])

        if(insertError) throw insertError
        res.status(201).json({message:'Job submited'})
    } catch (error) {
        res.status(500).json({message:'server error'})
    } 
}