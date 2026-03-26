import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import JobCard from "./jobCard"
import { completeJob, deleteJob, fetchAdmin, fetchJobs, logout } from "./services/jobsServices.js"
import "./adminDash.css"
import Hamburger from "hamburger-react"
import { FaBolt, FaMinus, FaPlus } from "react-icons/fa"
import { addProduct, getProducts, sellProduct } from "./services/productServices.js"
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
    const [customBrand, setCustomBrand] = useState('')
    const [customType, setCustomType] = useState('')
    const [prodType, setType] = useState('')
    const [prodBrand, setBrand] = useState('')
    const [prodPrice, setPrice] = useState('')
    const [salePrice, setSalePrice] = useState('')
    
    const [types, setTypes] = useState([])
    const [brands, setBrands] = useState([])

    const customBrandRef = useRef(null)
    const customTypeRef = useRef(null)

    const [saleOpen, setSaleOpen] = useState(false)
    const [addNewOpen, setNewOpen] = useState(false)

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
            setBrands([...new Set(data.map(i => i.brand))])
            setMessage({type: 'success', text: 'products loaded'})
        } catch (error) {
            setMessage({type: 'error', text:error.message})
        }
        
    }
    const openForm = (e)=> {
        e.target.style = {display:'none'}
        console.log('style',e.target.style)
        if(e.target.className === 'sellBtn') {
            setSaleOpen(prev => !prev)
            setFormOpen(prev => !prev)
            return
        }
        setNewOpen(prev => !prev)
        setFormOpen(prev => !prev)
    }
    const handleAdd = async(e)=> {
        e.preventDefault()
            const finalBrand = prodBrand==='other' ? customBrand: prodBrand
            const finalType = prodType==='other' ? customType: prodType
          try {
            const data = await addProduct({
                name: prodName.trim().toLowerCase(), 
                type: finalType.trim().toLowerCase(), 
                brand: finalBrand.trim().toLowerCase(), 
                price: Number(prodPrice), 
                stock: Number(stockValue)})
            setLoading(true)

            setName('')
            setType('')
            setBrand('')
            setPrice('')
            setStockValue(1)

            setMessage({type:'success', text: data.message})
            
            setTimeout(() => {
                loadProducts()
            }, 1500);
            
        } catch (error) {
            setMessage({type:'error', text:error.message})
        } finally {
            setLoading(false)
        }
    }

    const handleSell = async(e)=> {
        e.preventDefault()
        try {
            const data = await sellProduct({
                name: prodName.trim().toLowerCase(),
                type: prodType.trim().toLowerCase(),
                brand: prodBrand.trim().toLowerCase(),
                price : Number(prodPrice),
                salePrice: Number(salePrice),
                stock: Number(stockValue)
            })
            setLoading(true)
            setMessage({type: 'success', text: data.message })
            console.log(data.message)
            setTimeout(() => {
                loadProducts()
            }, 1500);
        } catch (error) {
            setMessage({type: 'error', text: error.message})
        } finally {
            setLoading(false)
        }
        
    }
   
    useEffect(() => {

        loadJobs()
        loadProducts()
    }, [])

    useEffect(() => {
        customBrandRef.current?.focus()
    }, [prodBrand])

    useEffect(() => {
        customTypeRef.current?.focus()
    }, [prodType])

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
                    <button 
                        style={{
                            display: saleOpen? 'none' :'block'
                        }} 
                        onClick={openForm} className="newPrdtBtn"
                    >
                        {formIsOpen? 'Close' : 'Add New Product'}
                    </button>
                    <button 
                        style={{
                            display: addNewOpen? 'none' :'block'
                        }} 
                        onClick={openForm} className="sellBtn"
                    >
                        {formIsOpen? 'Close' : 'Sell'}
                    </button>
                    {formIsOpen && 
                        <form className="prodForm" onSubmit={saleOpen? handleSell:handleAdd}>
                            <input 
                                name='name'
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
                                <option value="">Type (E.g. LED, Type c)</option>
                                {types.map((type)=> (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                                {!saleOpen && <option value='other'>other</option>}
                            </select>
                            {prodType === 'other' &&
                                <input
                                    name='type'
                                    ref={customTypeRef}
                                    value={customType} placeholder='Add type' 
                                    onChange={(e)=> {setCustomType(e.target.value)}}
                                />
                            }

                            <select 
                                name="brand" 
                                id="brand"
                                value={prodBrand}
                                onChange={(e)=> {setBrand(e.target.value)}}
                            >
                                <option value="">Brand</option>
                                {brands.map((brand)=> (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                                {!saleOpen && <option value='other'>other</option>}
                            </select>
                            {prodBrand === 'other' &&
                                <input
                                    name='brand'
                                    ref={customBrandRef}
                                    value={customBrand} placeholder='Add brand' 
                                    onChange={(e)=> {setCustomBrand(e.target.value)}}
                                />
                            }
                            
                            <input 
                                name='price'
                                value={prodPrice}
                                placeholder="Price" type="text"
                                onChange={(e)=> {setPrice(e.target.value)}}
                            />

                            {saleOpen &&
                            <input 
                                name='price'
                                value={salePrice}
                                placeholder='Sale Price' type="text"
                                onChange={(e)=> {setSalePrice(e.target.value)}}
                            />
                            }
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

                                <input name='stock' type='number' value={stockValue} onChange={(e)=> {setStockValue(e.target.value)}}/>

                                <button 
                                    id='stock' 
                                    type='button' 
                                    onClick={()=> {
                                        setStockValue(Number(stockValue) + 1)}}
                                >
                                    <FaPlus />
                                </button>

                            </div>
                            {!saleOpen && <button type="submit" className="submitBtn">Save</button>}
                            {saleOpen && <button type="submit" className="submitBtn">Done</button>}
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