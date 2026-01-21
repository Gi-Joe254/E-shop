import { createDB } from "./db.js"
import bcrypt from 'bcrypt'

const seedAdmin = async()=> {
    let db
    try {
        db = await createDB()
        const hashedPass = await bcrypt.hash('MAKA254', 10)
        const admin = {name: 'Makaveli', password: hashedPass}
        await db.run(`
            INSERT INTO admin (username, password) VALUES (?, ?)`,
            [admin.name, admin.password]
        )  
        console.log('admin table seeded')
    } catch (error) {
        console.error('error seeding admin table', error)
    } finally {
        await db.close()
    }
    
}
seedAdmin()