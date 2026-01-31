export const requireAdmin = (req, res, next)=> {
    if(!req.session.adminId) {
            return res.status(401).json({message: 'unauthorized'})
    }
    next()
}