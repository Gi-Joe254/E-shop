import supabase from "../database/db.js"

export const postSale = async(req, res)=> {
    const {productId, quantity, salePrice, total} = req.body
    try {
       const {data, error} = await supabase
        .from('sales')
        .insert({product_id: productId, quantity: quantity, sale_price: salePrice, total: total})

        if(error) throw error
        res.status(200).json({message:'sale recorded'})
    } catch (error) {
        res.status(500).json({message: 'server error'})
    }
}