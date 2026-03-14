import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import JobCard from "./jobCard"
import { completeJob, deleteJob, fetchAdmin, fetchJobs, logout } from "./services/jobsServices.js"
import "./adminDash.css"
import Hamburger from "hamburger-react"
import { FaBolt } from "react-icons/fa"
import { addProduct, getProducts } from "./services/productServices.js"
import ProdTable from "./prodTable.jsx"

export default function AdminDash() {
    const [jobs, setJobs] = useState([])
    const [products, setProducts] = useState([])
    const [adminName, setAdminName] = useState('')
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [busyId, setBusyId] = useState(null)
    const navigate = useNavigate()
    const [isOpen, setOpen] = useState(false)
    const [activeTab, setActive] = useState('jobs')

    const loadJobs = async () => {
        setLoading(true)
        try {
            const admin = await fetchAdmin()
            setAdminName(admin)

            const jobs = await fetchJobs()
            setJobs(jobs)
        } catch (error) {
            setMessage({ type: 'error', text: error.message })
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

    const toSite = ()=> {
        navigate('/')
    }
    
    //products
    const loadProducts = async()=> {
        try {
            const data = await getProducts()
            setProducts(data)
            setMessage({type: 'success', text: 'products loaded'})
        } catch (error) {
            setMessage({type: 'error', text:error.message})
        }
        
    }
    const handleAdd = async()=> {
          try {
            await addProduct()
            loadJobs()
            setMessage({type:'success', text:'Product added'})
        } catch (error) {
            setMessage({type:'error', text:error.message})
        }
    }

    useEffect(() => {

        loadJobs()
        loadProducts()
    }, [])

    useEffect(()=> {
        if(!message) return
        const timer = setTimeout(() => {
            setMessage(null)
        }, 2000);
        return ()=> {clearTimeout(timer)}
    },[message])


    return(
        <>
        <div className="adminDash">
            <nav>
                
                <h1 className="logo"><FaBolt /> Trixx Solutions</h1>
                <Hamburger 
                    toggle={setOpen} 
                    toggled={isOpen}
                    size={20}
                />
            </nav>
        
            <div className={`drop ${isOpen ? "open" : ""}`}>
                <p onClick={toSite}>Go to site</p>
                <button onClick={handleLogout} >Logout</button>
            </div>
        
            <header>
                <div className="adminActions">
                    <p>Hello, {adminName} (admin)</p>
                </div>
            </header>

            <div className="tab_btns">
                <button className={activeTab === 'jobs'? 'active': ''} onClick={()=>{setActive('jobs')}}>Jobs</button>
                <button className={activeTab === 'products'? 'active': ''} onClick={()=>{setActive('products')}}>Products</button>
                <button className={activeTab === 'sales'? 'active': ''} onClick={()=>{setActive('sales')}}>Sales</button>
            </div>

            {loading && <div className="loadingText">Loading...</div>}

            {activeTab === 'jobs' &&
                <>
                <h3>Jobs</h3>

                <JobCard
                    jobs ={jobs}
                    handleDelete={handleDelete}
                    handleComplete={handleComplete}
                    busyId={busyId}
                />
                </>
            }
            {!loading && jobs.length === 0 && activeTab === 'jobs' &&
                <div className="adminState">No jobs to show</div>
            }

            {activeTab === 'products' &&
                <div className= 'products'>
                    <button onClick={handleAdd}>Add Product</button>
                    <ProdTable
                        products = {products}
                    />
                </div>
                
            }
            {!loading && products.length === 0 && activeTab === 'products' &&
                <div className="adminState">No products to show</div>
            }

            {activeTab === 'sales' &&
                <div>Sales</div>
            }

           
        </div>

        {message &&
            <div className={`toast ${message.type}`}>
                {message.text}
            </div>
        }

        </>
    )
}