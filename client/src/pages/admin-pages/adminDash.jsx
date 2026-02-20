import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import JobCard from "./jobCard"
import { completeJob, deleteJob, fetchAdmin, fetchJobs, logout } from "./jobsServices"
import "./adminDash.css"

export default function AdminDash() {
    const [jobs, setJobs] = useState([])
    const [adminName, setAdminName] = useState('')
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [busyId, setBusyId] = useState(null)
    const navigate = useNavigate()

     const loadJobs = async()=> {
        setLoading(true)
        try {
            const admin = await fetchAdmin()
            setAdminName(admin)
            const jobs = await fetchJobs()
            setJobs(jobs)
        } catch (error) {
            setMessage({type:'error', text: error.message})
        } finally {
            setLoading(false)
        }
    }

    const handleComplete = async(id)=> {
        setBusyId(id)
        try {
            await completeJob(id)
            setMessage({type:'success', text:`Job id: ${id} marked as complete`})
            loadJobs()
        } catch (error) {
            setMessage({type:'error', text: error.message})
        } finally {
            setBusyId(null)
        }
        
    }

    const handleDelete = async(id)=> {
        setBusyId(id)
        try {
            await deleteJob(id)
            const remJobs = jobs.filter((item)=> {
                
                return item.id !== id
            })
            setJobs(remJobs) 
            setMessage({type:'success', text:`Job id: ${id} deleted`})
        } catch (error) {
            setMessage({type:'error', text: error.message})
        } finally {
            setBusyId(null)
        }
        
    }

    const handleLogout = async()=> {
        try {
            await logout()
            setMessage({type:'success', text: 'Logout Success'})
            navigate('/admin/login')
        } catch (error) {
            setMessage({type:'error', text: error.message})
        }
    }

    useEffect(()=> {
           
        loadJobs()
        
    },[])

    useEffect(()=> {
        if(!message) return
        const timer = setTimeout(() => {
            setMessage(null)
        }, 2000);
        return ()=> {clearTimeout(timer)}
    },[message])

    return(
        <>
        <header>Admin Dashboard</header>
        {loading && 
            <div>Loading...</div>
        }
        <p>Hello, {adminName} (admin)</p>
        <button onClick={handleLogout} >Logout</button>
        <div>Jobs</div>
        {message &&
            <div>{message.text}</div>
        }
        {!loading && jobs.length === 0 &&
            <div>No jobs to show</div>
        }
        <JobCard
            jobs ={jobs}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
            busyId={busyId}
        />
        </>
    )
}