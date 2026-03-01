// jobsServices.js

// Always read API at runtime, with fallback
const getAPI = () => import.meta.env.VITE_API_URL || "https://e-shop-xq78.onrender.com"

export const fetchJobs = async () => {
    const API = getAPI()
    console.log("fetchJobs using API:", API)

    const jobsRes = await fetch(`${API}/api/admin/dash`, {
        credentials: 'include'
    })

    const data = await jobsRes.json()
    if (!jobsRes.ok) throw new Error(data.message || 'Request failed')
    return data
}

export const fetchAdmin = async () => {
    const API = getAPI()
    console.log("fetchAdmin using API:", API)

    const adminRes = await fetch(`${API}/api/admin/me`, {
        credentials: 'include'
    })
    const adminData = await adminRes.json()
    if (!adminRes.ok) throw new Error(adminData.message || 'Request Failed')
    return adminData.username
}

export const completeJob = async (id) => {
    const API = getAPI()
    console.log("completeJob using API:", API)

    const res = await fetch(`${API}/api/admin/complete/${id}`, {
        method: 'PATCH',
        credentials: 'include'
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.message || 'Request Failed')
    return data
}

export const deleteJob = async (id) => {
    const API = getAPI()
    console.log("deleteJob using API:", API)

    const res = await fetch(`${API}/api/admin/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.message || 'Request Failed')
    return data
}

export const logout = async () => {
    const API = getAPI()
    console.log("logout using API:", API)

    const res = await fetch(`${API}/api/admin/logout`, {
        method: 'POST',
        credentials: 'include'
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.message || 'Request Failed')
    return data
}