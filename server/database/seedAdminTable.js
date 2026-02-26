import 'dotenv/config'  // automatically loads .env
import supabase from "./db.js"
import bcrypt from 'bcrypt'

const seedAdmin = async()=> {
    
    try {
        const hashedPass = await bcrypt.hash('MAKA254', 10)
        const admin = {username: 'Makaveli', password: hashedPass}

        const {data, error} = await supabase
            .from('admin')
            .insert([admin])
        
        if (error) throw error
        console.log('admin table seeded')
        
    } catch (error) {
        console.error('error seeding admin table', error)
    }
    
}
seedAdmin()