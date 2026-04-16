import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import JobCard from "./components/jobCard.jsx"
import { completeJob, deleteJob, fetchAdmin, fetchJobs, logout } from "./services/jobsServices.js"
import "./adminDash.css"
import Hamburger from "hamburger-react"
import { FaBolt, FaCheck, FaTimes } from "react-icons/fa"
import { addProduct, getProducts, getSales, sellProduct } from "./services/productServices.js"
import ProdTable from "./components/prodTable.jsx"
import SalesTable from "./components/salesTable.jsx"
import ProductForm from "./components/productForm.jsx"

export default function AdminDash() {
    const [jobs, setJobs] = useState([])
    const [products, setProducts] = useState([])
    const [sales, setSales] = useState([])
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
    const [customName, setCustomName] = useState('')

    const [customBrand, setCustomBrand] = useState('')
    const [customType, setCustomType] = useState('')
    const [prodType, setType] = useState('')
    const [prodBrand, setBrand] = useState('')
    const [prodPrice, setPrice] = useState('')
    const [salePrice, setSalePrice] = useState('')
    
    const [names, setNames] = useState([])
    const [types, setTypes] = useState([])
    const [brands, setBrands] = useState([])

    const customNameRef = useRef(null)
    const customBrandRef = useRef(null)
    const customTypeRef = useRef(null)
    const fileInputRef = useRef(null)

    const [saleOpen, setSaleOpen] = useState(false)
    const [addNewOpen, setNewOpen] = useState(false)

    const [searchName, setSearchName] = useState('')
    const [searchType, setSearchType] = useState('')

    const [saleSearchName, setSaleSearchName] = useState('')
    const [saleSearchType, setSaleSearchType] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    const totalSales = sales.reduce((sum, s)=> sum + s.total, 0)
    const totalQty = sales.reduce((sum, s) => sum += s.quantity, 0)

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
        setLoading(true)
        try {
            const data = await getProducts()
            setProducts(data)
            setNames([...new Set(data.map(i => i.name))])
            setTypes([...new Set(data.map(i => i.type))])
            setBrands([...new Set(data.map(i => i.brand))])
            setMessage({type: 'success', text: 'products loaded'})
        } catch (error) {
            setMessage({type: 'error', text:error.message})
        } finally {
            setLoading(false)
        }
        
    }
    const openForm = (e)=> {
        e.target.style = {display:'none'}
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
        const finalName = prodName==='other' ? customName: prodName     
        const finalBrand = prodBrand==='other' ? customBrand: prodBrand
        const finalType = prodType==='other' ? customType: prodType
    
        setLoading(true)  
        const formData = new FormData()

        formData.append('name', finalName.trim().toLowerCase())
        formData.append('type', finalType.trim().toLowerCase())
        formData.append('brand', finalBrand.trim().toLowerCase())
        formData.append('price', Number(prodPrice))
        formData.append('stock', Number(stockValue))

        const fileInput = document.querySelector('#uploadImg')

        if (fileInput?.files?.[0]) {
            formData.append('prodImage', fileInput.files[0])
        }
        try {
            const data = await addProduct(formData)

            setName('')
            setType('')
            setBrand('')
            setPrice('')
            setStockValue(1)
            
            //clear input for images
            if(fileInputRef.current) {
                fileInputRef.current.value = ''
            }

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
        setLoading(true)
        try {
            const data = await sellProduct({
                name: prodName.trim().toLowerCase(),
                type: prodType.trim().toLowerCase(),
                brand: prodBrand.trim().toLowerCase(),
                price : Number(prodPrice),
                salePrice: Number(salePrice),
                stock: Number(stockValue)
            })
            setName('')
            setType('')
            setBrand('')
            setPrice('')
            setStockValue(1)
            
            setMessage({type: 'success', text: data.message })
            
            loadSales()
            setTimeout(() => {
                loadProducts()
            }, 1500);
        } catch (error) {
            setMessage({type: 'error', text: error.message})
        } finally {
            setLoading(false)
        }
        
    }

    const loadSales = async(e)=> {
        if(e) {e.preventDefault()}
        
        setLoading(true)
        try {
            const data = await getSales(fromDate, toDate, saleSearchName, saleSearchType)
            setSales(data)
            setMessage({type: 'success', text: data.message})
        } catch (error) {
            setMessage({type: 'error', text: error.message})
        } finally {
            setLoading(false)
        }
    }

    const applyFilters = (e)=> {
        e.preventDefault()
        let filteredData

        if(!searchName && !searchType) {
            setSearchName('')
            setSearchType('')
            loadProducts()
            return
        }

        if(!searchName || !searchType) {
            filteredData = products.filter((i)=> i.name === searchName || i.type === searchType)
            setProducts(filteredData)
            return
        } 
        
        filteredData = products.filter((i)=> i.name === searchName && i.type === searchType
        )
        
        setProducts(filteredData)

    }

    const clearFilters = ()=> {
        if(activeTab === 'products') {
            setSearchName('')
            setSearchType('')
            
            loadProducts()
        }
        if(activeTab === 'sales') {
            setSaleSearchName('')
            setSaleSearchType('')
            setFromDate('')
            setToDate('')
        }
        
    }

    useEffect(()=> {
        const timer = setTimeout(() => {
            loadSales()
        }, 400) // wait 400ms after typing stops

        return () => clearTimeout(timer)
    },[fromDate, toDate, saleSearchName, saleSearchType])
   
    useEffect(() => {
        loadJobs()
        loadProducts()
        loadSales()
    }, [])

    useEffect(() => {
        customNameRef.current?.focus()
    }, [prodName])

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
            
            {/*jobs tab*/}
            {activeTab === 'jobs' &&
                <>
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

            {/*products tab*/}
            {activeTab === 'products' &&
                <> 
                <div className= 'products'>
                    <div className="productActions">
                        {!formIsOpen && 
                        <form onSubmit={applyFilters} className="filterFormProducts">
                            <div>Search Product:</div>
                            <input 
                                type="text" 
                                placeholder="by name"
                                value={searchName}
                                onChange={(e)=>{setSearchName(e.target.value)}}    
                            />
                            <input 
                                type="text" 
                                placeholder="by type"
                                value={searchType}
                                onChange={(e)=>{setSearchType(e.target.value)}}
                            />
                            <button type="submit"><FaCheck /></button>
                            <button type="button" onClick={clearFilters}><FaTimes /></button>
                        </form>
                    }

                        <button 
                            style={{
                                display: saleOpen? 'none' :'block'
                            }} 
                            onClick={openForm} className="newPrdtBtn"
                        >
                            {formIsOpen? 'Close' : 'Add New Product'}
                        </button>

                        {products.length > 0 &&
                            <button 
                                style={{
                                    display: addNewOpen? 'none' :'block'
                                }} 
                                onClick={openForm} className="sellBtn"
                            >
                                {formIsOpen? 'Close' : 'Sell Product'}
                            </button>
                        }
                    </div>

                    {formIsOpen && 
                        <div className="prodFormContainer">
                            <ProductForm
                                saleOpen = {saleOpen }
                                handleSell = {handleSell}
                                handleAdd = {handleAdd}
                                addNewOpen = {addNewOpen}
                                prodName = {prodName}
                                setName = {setName}
                                names = {names}
                                prodType = {prodType}
                                setType = {setType}
                                types = {types}
                                prodBrand = {prodBrand}
                                setBrand = {setBrand}
                                brands = {brands}
                                prodPrice = {prodPrice}
                                setPrice = {setPrice}
                                salePrice = {salePrice}
                                setSalePrice = {setSalePrice}
                                stockValue = {stockValue}
                                setStockValue = {setStockValue} 
                                customName= {customName} 
                                setCustomName={setCustomName}  
                                customNameRef={customNameRef} 
                                customType = {customType}
                                customTypeRef = {customTypeRef}
                                setCustomType = {setCustomType}
                                customBrand = {customBrand}
                                customBrandRef = {customBrandRef}
                                setCustomBrand = {setCustomBrand}
                                fileInputRef={fileInputRef}
                            />
                        </div>
                    }

                    {products.length > 0 && 
                        <ProdTable
                            products = {products}
                        />
                    }
                    
                </div>
            </> 
            }
            {!loading && products.length === 0 && activeTab === 'products' &&
                <div className="adminState">No products to show</div>
            }
    
            {/*sales tab*/}
            {activeTab === 'sales' &&
                <div className="sales">

                <div className="totals">
                    <div>Total Revenue: KES {totalSales}</div>
                    <div>Total Amount Sold: {totalQty} items</div>
                </div>

                <form onSubmit={loadSales} className="filterFormSales">
                    
                    <div>Filter Sales:</div>
                    <div className="inputs">
                        <input 
                            name= "name" 
                            type="text" 
                            placeholder="by name"
                            value={saleSearchName}
                            onChange={(e)=>{setSaleSearchName(e.target.value)}}    
                        />
                        <input 
                            name= "type" 
                            type="text" 
                            placeholder="by type"
                            value={saleSearchType}
                            onChange={(e)=>{setSaleSearchType(e.target.value)}}
                        />
                    </div>
                    
                    <div className="dates">
                        <label htmlFor="fromDate">From: </label>
                        <input
                            id="fromDate"
                            type="date" 
                            value={fromDate}
                            onChange={(e)=>{setFromDate(e.target.value)}}    
                        />

                        <label htmlFor="fromDate">To: </label>
                        <input 
                            type="date" 
                            value={toDate}
                            onChange={(e)=>{setToDate(e.target.value)}}    
                        />
                    </div>
                    <div className="filterBtns">
                        {/* removed button since useeffect updates onchange
                        <button type="submit">Apply</button>*/
                        }
                        <button type="button" onClick={clearFilters}>Clear</button>
                    </div>
                    
                </form>

                <SalesTable
                    sales={sales}
                /> 
                </div>
            }
            {!loading && sales.length === 0 && activeTab === 'sales' &&
                <div className="adminState">No Sales to show</div>
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