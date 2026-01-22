import express from 'express'
import { Router } from "express"
import { createDB } from '../database/db.js'
import bcrypt from 'bcrypt'

export const apiRouter = express.Router()
//public api routes
apiRouter.get('/health', (req, res)=> {
    res.json({status: 'ok'})
})
apiRouter.post('/customerReq', (req, res)=> {
    const data = req.body
    console.log(data)
    res.status(201).json({message:'api called'})
})

//admin api routes
apiRouter.post('/admin/login', async(req, res)=> {
    const { name, password} = req.body
    let db
    try {
        db = await createDB()
        const admin = await db.get(`
            SELECT * FROM admin WHERE username = ?
        `,[name])

        if(!admin) return res.status(401).json({message: 'wrong credentials'})

        const valid = await bcrypt.compare(password, admin.password)
        console.log(valid)
        if(!valid) return res.status(401).json({message:'wrong credentials'})

        res.status(200).json({message: 'login success'})
    } catch (error) {
        res.status(500).json({message: 'server error'})
    } finally {
        await db.close()
    }

})