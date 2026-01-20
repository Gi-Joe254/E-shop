import express from 'express'
import { Router } from "express"

export const apiRouter = express.Router()

apiRouter.get('/health', (req, res)=> {
    res.json({status: 'ok'})
})
apiRouter.get('/customerReq', (req, res)=> {
    res.status(201).json({message:'api called'})
})