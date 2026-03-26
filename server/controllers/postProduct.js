import supabase from "../database/db.js"

export const postProduct = async(req, res)=> {

    //validation
    let { name, type, brand, price, stock } = req.body
    name = name.trim().toLowerCase()
    type = type.trim().toLowerCase()
    brand = brand.trim().toLowerCase()

    if(!name || !type || !brand || !price || stock === null) {
        return res.status(400).json({message: 'missing fields'})
    }

    try {
        const { data: existing, error: selectError } = await supabase
            .from('products')
            .select('*')
            .eq('name', name.toLowerCase())
            .eq('type', type.toLowerCase())
            .eq('brand', brand.toLowerCase())
            .eq('price', price)
            
        if(selectError) throw selectError

        if(existing.length === 0) {
            
            const {data, insertError} = await supabase
                .from('products')
                .insert(req.body)

            if(insertError) throw insertError

            return res.status(200).json({message:'product added'})

        }

        const { error:updateError } =  await supabase
            .from('products')
            .update({stock: existing[0].stock += Number(stock) } )
            .eq('id', existing[0].id)

        if(updateError) throw updateError
        res.status(200).json({message: 'stock updated'})
       

    } catch (error) {
        res.status(500).json({message: 'server error'})
    }
    

   
}