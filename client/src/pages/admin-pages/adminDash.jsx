import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import JobCard from "./jobCard"
import { completeJob, deleteJob, fetchAdmin, fetchJobs, logout } from "./services/jobsServices.js"
import "./adminDash.css"
import Hamburger from "hamburger-react"
import { FaBolt, FaMinus, FaPlus } from "react-icons/fa"
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
    const [formIsOpen, setFormOpen] = useState(false)
    const [stockValue, setStockValue] = useState(1)
    const [prodName, setName] = useState('')
    const [prodType, setType] = useState('')
    const [prodBrand, setBrand] = useState('')
    const [prodPrice, setPrice] = useState([])
    
    const [types, setTypes] = useState('')

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
            setTypes([...new Set(data.map(i => i.type))])

            setMessage({type: 'success', text: 'products loaded'})
        } catch (error) {
            setMessage({type: 'error', text:error.message})
        }
        
    }
    const openForm = ()=> {
        setFormOpen(prev => !prev)
    }
    const handleAdd = async(e)=> {
        e.preventDefault()
        
          try {
            await addProduct({
                name: prodName, 
                type: prodType, 
                brand: prodBrand, 
                price: prodPrice, 
                stock: stockValue})

            loadProducts()
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
                <> 
                <h3>Products</h3>
                <div className= 'products'>
                    <button onClick={openForm} className="newPrdtBtn">
                        {formIsOpen ? 'close' : 'Add New Product'}
                    </button>
                    {formIsOpen && 
                        <form className="prodForm" onSubmit={handleAdd}>
                            <input 
                                value={prodName}
                                placeholder="Product Name (E.g. phone charger, bulb)" 
                                type="text"
                                onChange={(e)=> {setName(e.target.value)}}
                            />
                            <select 
                                name="type" 
                                id="type"
                                value={prodType}
                                onChange={(e)=> {setType(e.target.value)}}
                            >
                                <option defaultValue="">--select type--</option>
                                {types.map((type)=> (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                                <option value="other">Other</option>
                            </select>
                            
                            <input 
                                value={prodBrand}
                                placeholder="Brand" type="text"
                                onChange={(e)=> {setBrand(e.target.value)}}
                            />
                            <input 
                                value={prodPrice}
                                placeholder="Price" type="text"
                                onChange={(e)=> {setPrice(e.target.value)}}
                            />
                                <label htmlFor="stock">Stock</label>

                            <div className="btn_cont">
                                <button 
                                    type='button' 
                                    onClick={()=> {
                                        setStockValue(stockValue !=0 ? 
                                        Number(stockValue) - 1 : 0)}}
                                >
                                    
                                    <FaMinus />
                                </button>

                                <input type='number' value={stockValue} onChange={(e)=> {setStockValue(e.target.value)}}/>

                                <button 
                                    id='stock' 
                                    type='button' 
                                    onClick={()=> {
                                        setStockValue(Number(stockValue) + 1)}}
                                >
                                    <FaPlus />
                                </button>

                            </div>
                            <button type="submit" className="submitBtn">Save</button>
                        </form>
                    }
                    <ProdTable
                        products = {products}
                    />

                </div>
            </> 
            }
            {!loading && products.length === 0 && activeTab === 'products' &&
                <div className="adminState">No products to show</div>
            }

            {activeTab === 'sales' &&
                <>
                <h3>Sales</h3>
                </>
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