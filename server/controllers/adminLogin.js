import { createDB } from '../database/db.js'
import bcrypt from 'bcrypt'

export const adminLogin = async(req, res)=> {
    const { name, password} = req.body
    //validate login details
    if(!name || !password) {
        return res.status(400).json({message: `missing fields`})
    }
    if(typeof name !== 'string' || typeof password !=='string') {
        return res.status(400).json({message: `invalid credentials`})
    }
    if(name.length >  50 || password.length > 100) {
        return res.status(400).json({message: `credentials too long`})
    }
    //auth
    let db
    try {
        db = await createDB()
        const admin = await db.get(`
            SELECT * FROM admin WHERE username = ?
        `,[name])
        
        const hash = admin 
        ? admin.password 
        : '$2b$10$CwTycUXWue0Thq9StjUM0uJ8LQ0Jx7e8b6Qr1eK0Dc5j82d0Xl4He'

        const valid = await bcrypt.compare(password, hash)

        if(!admin || !valid) {
            return res.status(401).json({message: 'wrong credentials'})
        }
        req.session.adminId = admin.id
        req.session.isAdmin = true

        res.status(200).json({message: 'login success'})
    } catch (error) {
        res.status(500).json({message: 'server error'})
    } finally {
        if(db) await db.close()
    }

}