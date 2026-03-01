export const healthCheck = async()=> {
    const API = import.meta.env.VITE_API_URL
    
    const res = await fetch(`${API}/api/health`)
    return res.json()
}