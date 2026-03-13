import supabase from "../database/db.js"

export const postProduct = async(req, res)=> {
    try {
       const {data, error} = await supabase
        .from('products')
        .insert(req.body)

        if(error) throw error
        res.status(200).json({message:'product added'})
    } catch (error) {
        res.status(500).json({message: 'server error'})
    }
}