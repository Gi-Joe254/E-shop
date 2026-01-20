import express from 'express'
import { Router } from "express"

export const apiRouter = express.Router()

apiRouter.get('/health', (req, res)=> {
    res.json({status: 'ok'})
})
apiRouter.post('/customerReq', (req, res)=> {
    const data = req.body
    console.log(data)
    res.status(201).json({message:'api called'})
})