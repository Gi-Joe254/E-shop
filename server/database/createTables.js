import { createDB } from "./db.js";

const createTables = async()=> {
    let db
    try {
        db = await createDB()
        //services table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS services (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                description TEXT NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                telephone TEXT NOT NULL
            )    
        `)
        //user login table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL
            )    
        `)
        //admin login table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS admin (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                password TEXT NOT NULL
            )    
        `)
        console.log('all tables created')
    } catch (error) {
        console.error('error creating tables', error)
    } finally {
        await db.close()
    }
    
}
createTables()
