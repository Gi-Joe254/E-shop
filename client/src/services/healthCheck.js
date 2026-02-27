export const healthCheck = async()=> {
    const API = 'https://e-shop-xq78.onrender.com/'
    
    const res = await fetch(`${API}/api/health`)
    return res.json()
}