import express from 'express'
import { Router } from "express"
import { createDB } from '../database/db.js'
import bcrypt from 'bcrypt'

export const apiRouter = express.Router()
//public api routes
apiRouter.get('/health', (req, res)=> {
    res.json({status: 'ok'})
})
apiRouter.post('/customerReq', async(req, res)=> {
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
            SELECT id FROM jobs WHERE description = ? AND telephone = ?
            `, [description, telephone]
        )
        if(existing) return res.status(400).json({message: 'already submitted'})
        
        await db.run(`
            INSERT INTO jobs (type, description, name, email, telephone, location) 
            VALUES(?,?,?,?,?,?)
        `, [ type, description, name, email, telephone, location ]
        )
        res.status(201).json({message:'new job added'})
    } catch (error) {
        res.status(500).json({message:'server error'})
    } finally {
        if(db) await db.close()
    }
    
})

//admin api routes
apiRouter.post('/admin/login', async(req, res)=> {
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

})
apiRouter.get('/admin/dash', async(req, res)=> {
    let db
    try {
        db = await createDB()
        const jobs = await db.all(`
            SELECT * FROM jobs       
        `)
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({message:'server error'})
    } finally {
        if(db) await db.close()
    }
})

apiRouter.get('/admin/me', async(req, res)=> {
    let db
    try {
        if(!req.session.adminId) {
            return res.status(401).json({message: 'unauthorized'})
        }
        db = await createDB()
        const adminName = await db.get(`
           SELECT username FROM admin WHERE id = ?
        `, [req.session.adminId]
        )
        res.status(200).json(adminName)
    } catch (error) {
        res.status(500).json({message: 'server error'})
    } finally {
        if(db) await db.close()
    }
    
})

apiRouter.delete('/admin/me/delete/:id', async(req, res)=> {
    const jobId = Number(req.params.id)
    if(isNaN(jobId)) return res.status(400).json({message: 'invalid id'})
    console.log(jobId)
    let db
    try {
        db = await createDB()
        await db.run(`
           DELETE FROM jobs WHERE id = ?
        `, [jobId]
        )
        res.status(200).json({message:`job id: ${jobId} deleted`})
    } catch (error) {
        res.status(500).json({message: 'server error'})
    } finally {
        if(db) await db.close()
    }
    
})

apiRouter.post('/admin/logout', (req, res)=> {
    req.session.destroy(()=> {
        res.json({message: 'logged out'})
    })
})
