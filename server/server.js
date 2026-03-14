import 'dotenv/config'
import express, { json } from "express"
import cors from 'cors'
import { apiRouter } from "./routes/api.router.js"
import session from "express-session"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      origin.includes("vercel.app") ||
      origin.includes("localhost")
    ) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true
}))

app.use(json())

const isProd = process.env.NODE_ENV === "production"

console.log('NODE_ENV:', process.env.NODE_ENV, 'isProd:', isProd);
app.use(session({
    secret: process.env.SESSION_SECRET || 'my secret',
    resave: false,
    saveUninitialized: false,
    //proxy: true,
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: isProd,
        sameSite: isProd? 'none':'lax'
    }  
}))

//app.set('trust proxy', 1)

app.use('/api', apiRouter)

app.listen(PORT, ()=> console.log(`live on ${PORT}`))