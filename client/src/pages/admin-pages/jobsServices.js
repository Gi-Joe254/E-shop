
export const fetchJobs = async()=> {
    const API = import.meta.env.VITE_API_URL

    const jobsRes = await fetch(`${API}/api/admin/dash`, {
        credentials: 'include'
    })

    const data = await jobsRes.json()
    if (!jobsRes.ok) throw new Error(data.message || 'request failed')
    return data
}

export const fetchAdmin = async()=> {
    const API = import.meta.env.VITE_API_URL

    const adminRes = await fetch(`${API}/api/admin/me`, {
        credentials: 'include'
    })
    const adminData = await adminRes.json()
    if (!adminRes.ok) throw new Error(adminData.message || 'Request Failed')
    return adminData.username
}
            

export const completeJob = async(id)=> {
        const API = import.meta.env.VITE_API_URL

        const res = await fetch(`${API}/api/admin/complete/${id}`, {
            method: 'PATCH',
            credentials: 'include'
        })
        const data = await res.json()
        if(!res.ok) throw new Error(data.message || 'Request Failed')
        
        return data
}
    
export const deleteJob = async(id)=> {
        const API = import.meta.env.VITE_API_URL

        const res = await fetch(`${API}/api/admin/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        const data = await res.json()
        if(!res.ok) throw new Error(data.message || 'Request Failed')
        console.log(data.message)

        //filter the deleted job
        
        return data
    
}

export const logout = async()=> {
        const API = import.meta.env.VITE_API_URL
    
        const res = await fetch(`${API}/api/admin/logout`, {
            method: 'POST',
            credentials: 'include'
        })
        const data = await res.json()
        if(!res.ok) throw new Error(data.message || 'Request Failed')
        return data
}