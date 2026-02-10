import { createDB } from '../database/db.js'

export const customerReq = async(req, res)=> {
    const {type, description, name, email, telephone, location} = req.body
    let db
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

        db = await createDB()

        const existing = await db.get(`
            SELECT id FROM jobs 
            WHERE type = ?
                AND description = ?
                AND name = ?
                AND telephone = ?
                AND email = ?
                AND location = ?
                AND status != 'completed'
            `, [type, description, name, telephone, email, location]
        )
        if(existing) return res.status(400).json({message: 'already submitted'})
        
        await db.run(`
            INSERT INTO jobs (type, description, name, email, telephone, location) 
            VALUES(?,?,?,?,?,?)
        `, [ type, description, name, email, telephone, location ]
        )
        res.status(201).json({message:'Job submited'})
    } catch (error) {
        res.status(500).json({message:'server error'})
    } finally {
        if(db) await db.close()
    }
}