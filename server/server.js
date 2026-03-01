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
      origin.includes("vercel.app")
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

app.use(session({
    secret: process.env.secret || 'my secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }
}))

app.use('/api', apiRouter)

app.listen(PORT, ()=> console.log(`live on ${PORT}`))