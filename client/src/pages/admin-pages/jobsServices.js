const API = import.meta.env.VITE_API_URL

export const fetchJobs = async()=> {
    const jobsRes = await fetch(`${API}/api/dash`, {
        credentials: 'include'
    })

    const data = await jobsRes.json()
    if (!jobsRes.ok) throw new Error(data.message || 'request failed')
    return data
}

export const fetchAdmin = async()=> {
    const adminRes = await fetch(`${API}/api/admin/me`, {
        credentials: 'include'
    })
    const adminData = await adminRes.json()
    if (!adminRes.ok) throw new Error(adminData.message || 'Request Failed')
    return adminData.username
}
            

export const completeJob = async(id)=> {
    
        const res = await fetch(`${API}/api/admin/complete/${id}`, {
            method: 'PATCH',
            credentials: 'include'
        })
        const data = await res.json()
        if(!res.ok) throw new Error(data.message || 'Request Failed')
        
        return data
}
    
export const deleteJob = async(id)=> {
    
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
    
    
        const res = await fetch(`${API}/api/admin/logout`, {
            method: 'POST',
            credentials: 'include'
        })
        if(!res.ok) throw new Error(data.message || 'Request Failed')
        const data = await res.json()
        return data
}