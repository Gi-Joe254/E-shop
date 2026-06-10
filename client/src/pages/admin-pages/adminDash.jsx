import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import JobCard from "./components/jobCard.jsx"
import { completeJob, deleteJob, fetchAdmin, fetchJobs, logout } from "./services/jobsServices.js"
import "./adminDash.css"
import Hamburger from "hamburger-react"
import { FaArrowRight, FaBolt, FaBox, FaCheck, FaPlug, FaPlus, FaSignOutAlt, FaTimes, FaUserTag, FaWifi } from "react-icons/fa"
import { addProduct, getProducts, getSales, sellProduct } from "./services/productServices.js"
import ProdTable from "./components/prodTable.jsx"
import SalesTable from "./components/salesTable.jsx"
import ProductForm from "./components/productForm.jsx"

export default function AdminDash() {
    const [jobs, setJobs] = useState([])
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [sales, setSales] = useState([])
    const [adminName, setAdminName] = useState('')
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [busyId, setBusyId] = useState(null)
    const navigate = useNavigate()
    const [isOpen, setOpen] = useState(false)
    const [activeTab, setActive] = useState('jobs')
    const [formIsOpen, setFormOpen] = useState(false)
    const [stockValue, setStockValue] = useState(0)
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
    const [addOpen, setAddOpen] = useState(false)
    const [newOpen, setNewOpen ] = useState(false)

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
            setAllProducts(data)
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

    const [autoName, setAutoName] = useState('')
    const [autoType, setAutoType] = useState('')
    const [autoBrand, setAutoBrand] = useState('')
    const [autoPrice, setAutoPrice] = useState(0)
    const [autoStock, setAutoStock] = useState(0)

    const openSellForm = (item)=> {
        setAutoName(item.name)
        setAutoBrand(item.brand)
        setAutoType(item.type)
        setAutoPrice(item.price)
        setAutoStock(item.stock)

        setSaleOpen(true)
        setAddOpen(false)
        setNewOpen(false)
        setFormOpen(true)
    }

    const openAddForm = (item)=> {
        setAutoName(item.name)
        setAutoBrand(item.brand)
        setAutoType(item.type)
        setAutoPrice(item.price)
        setAutoStock(item.stock)

        setSaleOpen(false)
        setAddOpen(true)
        setNewOpen(false)
        setFormOpen(true)
    }

    const openNewForm = ()=> {
        setActive('products')
        setAutoName('')
        setAutoBrand('')
        setAutoType('')
        setAutoPrice('')
        setAutoStock('')

        setSaleOpen(false)
        setAddOpen(false)
        setNewOpen(true)
        setFormOpen(true)
    }

    const closeForm = ()=> {
        setFormOpen(false)
        setSaleOpen(false)
        setAddOpen(false)
        setNewOpen(false)

        setAutoName('')
        setAutoBrand('')
        setAutoType('')
        setAutoPrice(0)
        setAutoStock(0)
    }

    const handleAdd = async(e)=> {
        e.preventDefault()
        
        const finalName = prodName==='other' ? customName: (prodName || autoName)    
        const finalBrand = prodBrand==='other' ? customBrand: (prodBrand || autoBrand)
        const finalType = prodType==='other' ? customType: (prodType || autoType)
        const finalPrice = Number(prodPrice || autoPrice)

        setLoading(true)  
        const formData = new FormData()

        formData.append('name', finalName.trim().toLowerCase())
        formData.append('type', finalType.trim().toLowerCase())
        formData.append('brand', finalBrand.trim().toLowerCase())
        formData.append('price', finalPrice)
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

            setAutoBrand('')
            setAutoName('')
            setAutoPrice(0)
            setAutoStock(0)
            setAutoType('')
            
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
                name: prodName.trim().toLowerCase() || autoName,
                type: prodType.trim().toLowerCase() || autoType,
                brand: prodBrand.trim().toLowerCase() || autoBrand,
                price : Number(prodPrice) || autoPrice,
                salePrice: Number(salePrice),
                stock: Number(stockValue)
            })

            setName('')
            setType('')
            setBrand('')
            setPrice(0)
            setAutoName('')
            setAutoType('')
            setAutoBrand('')
            setAutoPrice(0)
            setStockValue(0)
            
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

        const filteredData = allProducts.filter((i)=> {
            const matchName = !searchName ||
                i.name.toLowerCase().includes(searchName.toLowerCase())
            const matchType = !searchType ||
                i.type.toLowerCase().includes(searchType.toLowerCase())

            return matchName && matchType
        })
        
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
            <aside className="sideBar">
                <div className="brand">
                    <FaBolt />
                    <h1 className="adminLogo"> Trixx Solutions</h1>
                </div>

                <div 
                    className={activeTab === 'jobs'? 'active': ''} 
                    onClick={()=>{setActive('jobs')}}
                >
                    <FaPlug />
                    <span>Jobs</span>
                </div>

                <div 
                    className={activeTab === 'products'? 'active': ''} 
                    onClick={()=>{setActive('products')}}
                >   
                    <FaBox />
                    <span>Products</span>
                </div>

                <div 
                    className={activeTab === 'sales'? 'active': ''} 
                    onClick={()=>{setActive('sales')}}
                >
                    <FaUserTag />
                    <span>Sales</span>
                </div>

                <div 
                    onClick={openNewForm} 
                    className="addNewBtn"
                >
                    <FaPlus />
                    <span>New Product</span>
                </div>

                <div onClick={toSite}>
                    <FaWifi />
                    <span>View Site</span>
                </div>
                
                <div onClick={handleLogout} >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </div>
            
            </aside>

            {loading && <div className="loadingText">Loading...</div>}
            
            <main>
                <div className="dashCard">
                    <header className="dashboardHeader">
                        <div className="adminActions">
                            <h1>Welcome Back</h1>
                            <p>{adminName}</p>
                        </div>
                    </header>

                    <section className="stats">

                        <div className="statCard">
                            <div className="label">Products</div>
                            <div className="value">{products.length}</div>
                        </div>

                        <div className="statCard">
                            <div className="label">Jobs</div>
                            <div className="value">{jobs.length}</div>
                        </div>

                        <div className="statCard">
                            <div className="label">Revenue</div>
                            <div className="value">KES {totalSales}</div>
                        </div>

                        <div className="statCard">
                            <div className="label">Items Sold</div>
                            <div className="value">{totalQty}</div>
                        </div>

                    </section>

                    <section className="contentArea">
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
                                        <div>Filter Products:</div>
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
                                        <button type="submit">Apply</button>
                                        <button type="button" onClick={clearFilters}>Clear</button>
                                    </form>
                                }

                                </div>

                                {formIsOpen && 
                                    <div className="prodFormContainer">
                                        <ProductForm
                                            saleOpen = {saleOpen }
                                            handleSell = {handleSell}
                                            handleAdd = {handleAdd}
                                            addOpen = {addOpen}
                                            newOpen={newOpen}
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
                                            formIsOpen={formIsOpen}
                                            autoName={autoName}
                                            autoBrand={autoBrand}
                                            autoType={autoType}
                                            autoPrice={autoPrice}
                                            autoStock={autoStock}
                                            closeForm={closeForm}
                                            loading={loading}
                                        />
                                    </div>
                                }

                                {products.length > 0 && 
                                    <ProdTable
                                        products = {products}
                                        openSellForm={openSellForm}
                                        openAddForm={openAddForm}
                                        loading={loading}
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

                    
                    
                    </section>
                </div>
                
            </main>
        </div>

        {message &&
            <div className={`toast ${message.type}`}>
                {message.text}
            </div>
        }

        </>
    )
}