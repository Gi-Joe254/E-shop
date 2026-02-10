import { useState } from "react"
import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import JobCard from "./jobCard"
import { completeJob, deleteJob, fetchAdmin, fetchJobs, logout } from "./jobsServices"

export default function AdminDash() {
    const [jobs, setJobs] = useState([])
    const [adminName, setAdminName] = useState('')
    const navigate = useNavigate()

     const loadJobs = async()=> {
        try {
            const admin = await fetchAdmin()
            setAdminName(admin)
            const jobs = await fetchJobs()
            setJobs(jobs)
        } catch (error) {
            console.log(error)
        }
    }

    const handleComplete = async(id)=> {
        try {
            await completeJob(id)
            loadJobs()
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleDelete = async(id)=> {
        try {
           await deleteJob(id)
            const remJobs = jobs.filter((item)=> {
                
                return item.id !== id
            })
            setJobs(remJobs) 
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleLogout = async()=> {
        try {
            await logout()
            navigate('/admin/login')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
           
        loadJobs()
        
    },[])

    return(
        <>
        <header>Admin Dashboard</header>
        <p>Hello, {adminName} (admin)</p>
        <button onClick={handleLogout}>Logout</button>
        <div>Jobs</div>
       
        <JobCard
            jobs = {jobs}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
        />
        </>
    )
}