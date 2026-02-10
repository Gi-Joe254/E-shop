import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminLogin() {
    const [admin, setAdmin] = useState({name:'', password:''})
    const [loginMessage, setLoginMessage] = useState()
    const [busyId, setBusyId] = useState(false)

    const navigate = useNavigate()

    //set timeout for loginMessage div
    useEffect(()=> {
        if(!loginMessage) return
        const timer = setTimeout(() => {
            setLoginMessage(null)
        }, 2000);
        return ()=> {clearTimeout(timer)}
    },[loginMessage])

    const handleSubmit = async(e)=> {
        e.preventDefault()
        setBusyId(true)
        try {
            const res = await fetch('http://localhost:3000/api/admin/login', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(admin),
                credentials: 'include'
            })
            const data = await res.json()
            if(!res.ok) {
                return setLoginMessage({text: data.message, type: 'error'})
            }
            setLoginMessage({text: data.message, type: 'success'})
            navigate('/admin/dashboard')
        } catch (error) {
            setLoginMessage({text: error.message, type: 'error'})
        } finally {
            setAdmin({name:'', password:''})
            console.log(e.target.adminName.value)
            setBusyId(false)
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
                <button type="submit" disabled = {busyId}>Log In</button>
            </form>
            {loginMessage &&
                <div>{loginMessage.text}</div>
            }
        </>
    )
}