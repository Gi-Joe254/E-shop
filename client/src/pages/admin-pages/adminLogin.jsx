import { useState } from "react"

export default function AdminLogin() {
    const [admin, setAdmin] = useState({name:'', password:''})

    const handleSubmit = async(e)=> {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:3000/api/admin/login', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(admin)
            })
            const data = await res.json()
            if(!res.ok) {
                return console.log(data.message)
            }
            console.log(data.message)
            window.location.href = '/admin/dashboard'
        } catch (error) {
            console.error('login details not sent', error)
        }
        
    }

    return(
        <>
            <header>Admin Login</header>
            <form onSubmit={handleSubmit}>
                <label htmlFor="adminName">Admin Name</label>
                <input 
                    type="text" id="adminName" name="adminName"
                    value={admin.name}
                    onChange={(e)=> {setAdmin({...admin, name: e.target.value})}}
                    required
                />

                <label htmlFor="adminPass">Password</label>
                <input 
                    type="password" id="adminPass" name="adminPass"
                    value={admin.password}
                    onChange={(e)=> {setAdmin({...admin, password: e.target.value})}}
                    required
                />
                <button type="submit">Log In</button>
            </form>
        </>
    )
}