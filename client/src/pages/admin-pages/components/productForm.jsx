import { FaMinus, FaPlus } from "react-icons/fa"

export default function ProductForm ({
    saleOpen, 
    handleSell, 
    handleAdd, 
    addNewOpen, 

    prodName, 
    setName, 
    names, 

    prodType, 
    setType, 
    types, 

    prodBrand, 
    setBrand,
    brands,

    prodPrice, 
    setPrice,
    salePrice, 
    setSalePrice, 

    stockValue, 
    setStockValue,   
     
    customType,
    customTypeRef, 
    setCustomType, 
     
    customBrand,
    customBrandRef, 
    setCustomBrand, }) {
    return(
        <form className="prodForm" onSubmit={saleOpen? handleSell:handleAdd}>
            {addNewOpen &&
                <input 
                    name='name'
                    value={prodName}
                    placeholder="Product Name (E.g. phone charger, bulb)" 
                    type="text"
                    onChange={(e)=> {setName(e.target.value)}}
                />
            }
            {saleOpen &&
                <select 
                    name="name" 
                    id="name"
                    value={prodName}
                    onChange={(e)=> {setName(e.target.value)}}
                >
                    <option value="">Name</option>
                    {names.map((name)=> (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            }
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
    )
}