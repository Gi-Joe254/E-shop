export const getProducts = async()=> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/product`,
        {credentials: 'include'}
    )
    const data = await res.json()
    
    if(!res.ok) throw new Error(data.message || 'Request Failed')

    return data
}

export const addProduct = async({name, type, brand, price, stock})=> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/product`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(name, type, brand, price, stock),
            credentials: 'include'
        }
    )
    const data = await res.json()
    if(!res.ok) throw new Error(data.message || 'Request Failed')
    return data
}
