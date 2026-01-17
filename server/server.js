import express, { json } from "express"
import cros from 'cors'

const app = express()
const PORT = process.env.PORT || 3000
app.use(cros({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(json())
app.get('/api/health', (req, res)=> {
    res.json({status: 'ok'})
})
app.listen(PORT, ()=> console.log(`live on ${PORT}`))