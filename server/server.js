import express, { json } from "express"
import cors from 'cors'
import { apiRouter } from "./routes/api.router.js"
import session from "express-session"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(json())

app.use(session({
    secret: process.env.secret || 'my secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}))

app.use('/api', apiRouter)

app.listen(PORT, ()=> console.log(`live on ${PORT}`))