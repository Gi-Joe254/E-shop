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
            if(!res.ok) {
                throw new Error('server error', res.status)
            }
            console.log('login details sent')
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
                />

                <label htmlFor="adminPass">Password</label>
                <input 
                    type="password" id="adminPass" name="adminPass"
                    value={admin.password}
                    onChange={(e)=> {setAdmin({...admin, password: e.target.value})}}
                />
                <button type="submit">Log In</button>
            </form>
        </>
    )
}