import supabase from "../database/db.js"

export const postSale = async(req, res)=> {
    const {name, type, brand, salePrice, price, stock} = req.body
    if(!name || !type || !brand || !price || stock === null) {
        return res.status(400).json({message: 'missing fields'})
    }

    try {
       const {data: product, error: selectError} = await supabase
        .from('products')
        .select('id, stock')
        .eq('name', name.toLowerCase())
        .eq('type', type.toLowerCase())
        .eq('brand', brand.toLowerCase())
        .lte('price', Number(price) + 50)
        .gte('price', Number(price) - 50)

        if(selectError) throw selectError

        if(!product || product.length === 0) {
            return res.status(404).json({message: "product not found"})
        }
        const newStock = product[0].stock - Number(stock)
        if (product[0].stock < Number(stock)) {
            return res.status(400).json({message:'insufficient stock'})
        }

        const {error: updateError} = await supabase
            .from('products')
            .update({stock: newStock})
            .eq('id', product[0].id)

        if(updateError) throw updateError

        
        
        const {error:insertError} = await supabase
            .from('sales')
            .insert({
                product_id: product[0].id,
                product: name.toLowerCase(),
                quantity: Number(stock),
                sale_price: Number(salePrice),
                total: salePrice * Number(stock),
                type: type.toLowerCase(),
                brand: brand.toLowerCase()
            })
            if(insertError) throw insertError
            res.status(200).json({message:'sale recorded'})
    } catch (error) {
        res.status(500).json({message: 'server error'})
    }
}