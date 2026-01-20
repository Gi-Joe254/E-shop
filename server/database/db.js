import path from 'node:path'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const createDB = async()=> {
    const __dirname = import.meta.dirname
    console.log(__dirname)
    
    const db = await open({
        filename: path.join(__dirname, 'database.db'),
        driver: sqlite3.Database
    })
    return db
}

