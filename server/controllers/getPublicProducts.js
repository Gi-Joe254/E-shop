import supabase from "../database/db.js"

export const getPublicProducts = async(req, res) => {
    try {
        const {data, error} = await supabase
            .from('products')
            .select('*')

        if (error) throw error
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
}