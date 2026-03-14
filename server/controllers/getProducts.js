import supabase from "../database/db.js"

export const getProducts = async(req, res)=> {
    try {
       const {data, error} = await supabase
        .from('products')
        .select('*')
        .order('id', {ascending: false})

        if(error) throw error
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: 'server error'})
    }
}