import express from 'express'
import { Router } from "express"
import { createDB } from '../database/db.js'
import bcrypt from 'bcrypt'
import { customerReq } from '../controllers/customerReq.js'
import { adminLogin } from '../controllers/adminLogin.js'
import { adminDash, adminDelJob, adminMe, completeJob } from '../controllers/adminDash.js'
import { requireAdmin } from '../middleware/requireAdmin.js'

export const apiRouter = express.Router()
//public api routes
apiRouter.get('/health', (req, res)=> {
    res.json({status: 'ok'})
})
apiRouter.post('/customerReq', customerReq)

//admin api routes
apiRouter.post('/admin/login', adminLogin)

//protect /admin routes
apiRouter.use('/admin', requireAdmin)

apiRouter.get('/admin/dash', adminDash)

apiRouter.get('/admin/me', adminMe)

apiRouter.patch('/admin/complete/:id', completeJob)

apiRouter.delete('/admin/delete/:id', adminDelJob)

apiRouter.post('/admin/logout', (req, res)=> {
    req.session.destroy(()=> {
        res.json({message: 'logged out'})
    })
})
