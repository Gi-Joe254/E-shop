import supabase from "../database/db.js"

export const getSales = async(req, res)=> {
    try {
        const { fromDate, toDate, name, type } = req.query

        let query = supabase
            .from('sales')
            .select('*')
            .order('created_at', {ascending: false})

        if(fromDate) {
            query = query.gte('created_at', fromDate)

        }

        if(toDate) {
            query = query.lte('created_at', toDate)
        }
        
        if(name) {
            query = query.ilike('product', `%${name}%`)
        }
        if(type) {
            query = query.eq('type', type)
        }

        const {data, error} = await query

        if(error) throw error
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: 'server error'})
    }
}