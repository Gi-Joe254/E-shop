import { useState } from "react"
import { useEffect } from "react"

export default function AdminDash() {
    const [jobs, setJobs] = useState([])
    const [adminName, setAdminName] = useState('')

    const handleDelete = async(id)=> {
        console.log(id)
        try {

            const res = await fetch(`http://localhost:3000/api/admin/me/delete/${id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            if(!res.ok) throw new Error(res.status)
            console.log(data.message)

            //filter the deleted job
            
            const remJobs = jobs.filter((item)=> {
                
                return item.id !== id
            })
            setJobs(remJobs)
        } catch (error) {
            console.error('failed to delete', error)
        }
        
    }

    const handleLogout = async()=> {
        try {
            const res = await fetch('http://localhost:3000/api/admin/logout', {
                method: 'POST',
                credentials: 'include'
            })
            if(!res.ok) throw new Error(res.status)
            window.location.href = 'admin/login'
        } catch (error) {
            console.error('failed to delete', error)
        }
        
    }

    useEffect(()=> {
        const loadJobs = async()=> {
            try {
                const jobsRes = await fetch('http://localhost:3000/api/admin/dash', {
                    credentials: 'include'
                })
                if (!jobsRes.ok) throw new Error(jobsRes.status)
                const data = await jobsRes.json()
                setJobs(data)

                const adminRes = await fetch('http://localhost:3000/api/admin/me', {
                    credentials: 'include'
                })
                if (!adminRes.ok) throw new Error(adminRes.status)
                const adminData = await adminRes.json()
                setAdminName(adminData.username)
            } catch (error) {
                console.error('Failed to load jobs:', error)
            }         
        } 
        loadJobs()
    },[])


    return(
        <>
        <header>Admin Dashboard</header>
        <p>Hello, {adminName} (admin)</p>
        <button onClick={handleLogout}>Logout</button>
        {jobs.map((item)=> {
            return(
                <div key={item.id}> Jobs
                    <p> {item.type}</p>
                    <p> {item.description}</p>
                    <p> {item.name}</p>
                    <p> {item.email}</p>
                    <p> {item.telephone}</p>
                    <p >{item.location}</p>
                    <button onClick={()=>{handleDelete(item.id)}}>Delete</button>
                </div>
            )
        })}
        </>
    )
}