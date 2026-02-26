import "dotenv/config"
import supabase from '../database/db.js'
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
    
    try {
        const { data, error } = await supabase
            .from('admin')
            .select('id, password')
            .eq('username', name)
            .single()

        if (error && error.code !== 'PGRST116') throw error  // ignore "no rows" error

        if (!data) {
            return res.status(401).json({ message: 'wrong credentials' })
        }

        const hash = data
        ? data.password 
        : '$2b$10$CwTycUXWue0Thq9StjUM0uJ8LQ0Jx7e8b6Qr1eK0Dc5j82d0Xl4He'

        const valid = await bcrypt.compare(password, hash)

        if(!valid) {
            return res.status(401).json({message: 'wrong credentials'})
        }
        //set session
        req.session.adminId = data.id
        req.session.isAdmin = true
        console.log(data.id)
        res.status(200).json({message: 'login success'})
    } catch (error) {
        res.status(500).json({message: 'server error'})
    }

}