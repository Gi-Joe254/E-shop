import { useState } from "react"
import { useEffect } from "react"

export default function AdminDash() {
    const [jobs, setJobs] = useState([])
    const [admin, setAdmin] = useState('')

    
    useEffect(()=> {
        const loadJobs = async()=> {
            const res = await fetch('http://localhost:3000/api/admin/dash')
            if (!res.ok) return console.log(res.status)
            const data = await res.json()
            //map object to get data to show
            setJobs(data)
        }
        loadJobs()
        console.log('useeffect run!')
    },[])

    return(
        <>
        <header>Admin Dashboard</header>
        <p>Hello, {admin} (admin)</p>
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