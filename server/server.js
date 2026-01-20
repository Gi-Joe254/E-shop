import express, { json } from "express"
import cros from 'cors'
import { apiRouter } from "./routes/api.router.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cros({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(json())

app.use('/api', apiRouter)

app.listen(PORT, ()=> console.log(`live on ${PORT}`))