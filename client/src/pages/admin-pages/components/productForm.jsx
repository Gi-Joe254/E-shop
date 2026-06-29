import { useEffect } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"
import './productForm.css'

export default function ProductForm ({
    saleOpen, 
    handleSell, 
    handleAdd, 
    newOpen, 
    addOpen,

    prodName, 
    setName, 
    names,
    customName,
    customNameRef,
    setCustomName,

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
    setCustomBrand,

    fileInputRef,

    autoName,
    autoStock,
    autoPrice,
    autoBrand,
    autoType,

    closeForm,
    loading
}) {
    
    return(
        <>
        <form className="prodForm" onSubmit={saleOpen ? handleSell:handleAdd}
            encType="multipart/form-data"
        >   
        <button 
            onClick={closeForm}
            type="button"
        >
            X
        </button> 
        <select 
            name="name" 
            id="name"
            value={autoName? autoName : prodName}
            onChange={(e)=> {setName(e.target.value)}}
            disabled = {autoName}
        >
            <option value="">Name</option>
            {names.map((name)=> (
                <option key={name} value={name}>{name}</option>
            ))}
            {!saleOpen && <option value='other'>other</option>}
        </select>
            
        {prodName === 'other' &&
            <input
                name='name'
                ref={customNameRef}
                value={customName} placeholder='Add name' 
                onChange={(e)=> {setCustomName(e.target.value)}}
            />
        }

        <select 
            name="type" 
            id="type"
            value={autoType? autoType: prodType}
            onChange={(e)=> {setType(e.target.value)}}
            disabled={autoType}
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
            value={autoBrand? autoBrand : prodBrand}
            onChange={(e)=> {setBrand(e.target.value)}}
            disabled={autoBrand}
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
            value={autoPrice ? autoPrice: prodPrice}
            placeholder="Price" type="text"
            onChange={(e)=> {setPrice(e.target.value)}}
            disabled={autoPrice}
        />

        {saleOpen && autoName &&
            <input 
                name='price'
                value={salePrice}
                placeholder='Sale Price' type="text"
                onChange={(e)=> {setSalePrice(e.target.value)}}
            />
        }
                <label htmlFor="stock">Items</label>

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
        
            {newOpen &&
                <>
                <label htmlFor="uploadImg">Upload Image:</label>
                <input type="file" accept="image/*" id="uploadImg" name="prodImage" ref={fileInputRef}/>

                <button type="submit" 
                    className="submitBtn"
                    disabled={!!loading}
                >
                    Add
                </button>
                </>
            }
            
            {addOpen && 
                <button type="submit" 
                    className="submitBtn"
                    disabled={!!loading}
                >
                    Add
                </button>
            }
            {saleOpen && <button type="submit" className="submitBtn">Sell</button>}
        </form>
        </>
    )
}