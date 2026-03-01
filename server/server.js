import express, { json } from "express"
import cors from 'cors'
import { apiRouter } from "./routes/api.router.js"
import session from "express-session"

const app = express()
const PORT = process.env.PORT || 3000


app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin || // allow server-side tools
      origin.includes("localhost") ||
      origin.includes("vercel.app")
    ) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'POST'],
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
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}))

app.use('/api', apiRouter)

app.listen(PORT, ()=> console.log(`live on ${PORT}`))