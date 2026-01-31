import { useState } from "react"
import { useEffect } from "react"

export default function AdminDash() {
    const [jobs, setJobs] = useState([])
    const [adminName, setAdminName] = useState('')

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
        {jobs.map((item)=> {
            return(
                <div key={item.id}>
                    <p> {item.type}</p>
                    <p> {item.description}</p>
                    <p> {item.name}</p>
                    <p> {item.email}</p>
                    <p> {item.telephone}</p>
                    <p >{item.location}</p>
                </div>
            )
        })}
        </>
    )
}