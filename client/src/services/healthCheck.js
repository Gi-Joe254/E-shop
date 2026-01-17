export const healthCheck = async()=> {
    const res = await fetch('http://localhost:3000/api/health')
    return res.json()
}