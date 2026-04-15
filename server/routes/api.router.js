import express from 'express'
import { customerReq } from '../controllers/customerReq.js'
import { adminLogin } from '../controllers/adminLogin.js'
import { adminDash, adminDelJob, adminMe, completeJob } from '../controllers/adminDash.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { postProduct } from '../controllers/postProduct.js'
import { getProducts } from '../controllers/getProducts.js'
import { postSale } from '../controllers/postSale.js'
import { getSales } from '../controllers/getSales.js'
import { getPublicProducts } from '../controllers/getPublicProducts.js'
import multer from 'multer'
export const apiRouter = express.Router()

const upload = multer({dest: 'uploads/'})
//public api routes
apiRouter.get('/health', (req, res)=> {
    res.json({status: 'ok'})
})
apiRouter.post('/customerReq', customerReq)

apiRouter.get('/products', getPublicProducts)

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

//stock routes
apiRouter.get('/admin/product', getProducts)
apiRouter.post(
    '/admin/product', 
    upload.single('prodImage'),  
    postProduct
)

apiRouter.get('/admin/sale', getSales)
apiRouter.post('/admin/sale', postSale)
