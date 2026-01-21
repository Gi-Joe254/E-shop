import express from 'express'
import { Router } from "express"

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
apiRouter.post('/admin/login', (req, res)=> {
    const data = req.body
    console.log(data)
    res.status(201).json({status: 'ok'})
})