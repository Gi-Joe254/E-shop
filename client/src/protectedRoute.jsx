import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(()=> {
        const checkAdmin = async()=> {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/me`, {
                    credentials: 'include'
                })
                if(!res.ok) {
                    setIsAdmin(false)
                    return
                }
                
                const data = await res.json()

                if (data?.username){
                    setIsAdmin(true)
                }else {
                    setIsAdmin(false)
                }
                
            } catch (error) {
                setIsAdmin(false)
            }
        }
        checkAdmin()
    },[])

    if(isAdmin === null) return <div>Loading...</div>
    if(isAdmin === false) return <Navigate to={'/admin/login'} replace />
    return children
}