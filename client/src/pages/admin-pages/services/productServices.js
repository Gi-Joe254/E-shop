export const getProducts = async()=> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/product`,
        {credentials: 'include'}
    )
    const data = await res.json()
    
    if(!res.ok) throw new Error(data.message || 'Request Failed')

    return data
}

export const addProduct = async(formData)=> {
    
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/product`,
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    )
    const data = await res.json()
    if(!res.ok) throw new Error(data.message || 'Request Failed')
    return data
}

export const sellProduct = async({name, type, brand, price, salePrice, stock})=> {
    
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/sale`,
        {
            method: 'POST',
            headers: {'Content-Type':'application/json'}, 
            body: JSON.stringify({name, type, brand, price, salePrice, stock}),
            credentials: 'include'
        }
    )

    const data = await res.json()
    if(!res.ok) throw new Error(data.message || 'Request Failed')
    return data
}

export const getSales = async(fromDate, toDate, name, type)=> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/sale?fromDate=${fromDate}&toDate=${toDate}&name=${name}&type=${type}`, {
        credentials: 'include'
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.message || 'Request Failed')
    return data
}
