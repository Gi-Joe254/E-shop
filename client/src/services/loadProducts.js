export const loadPublicProducts = async()=> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, 
        {credentials: 'include'})
    const data = await res.json()

    if(!res.ok) throw new Error(data.message || 'Request Failed')
    
    return data
}