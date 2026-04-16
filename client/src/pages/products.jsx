import { useEffect, useState } from "react";
import './products.css'
import Nav from "../components/nav";
import { loadPublicProducts } from "../services/loadProducts";
import Product from "../components/productCard";
import NavLinks from "../components/navLinks";

export default function Products() {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    
    const loadProducts = async()=> {
        setLoading(true)
        try {
            const data = await loadPublicProducts()
            console.log(data)
            setProducts(data)
        } finally {
           setLoading(false) 
        }
    }
    useEffect(()=>{
        loadProducts()
        console.log(products)
    },[])
    return(
        <div className="productsPage">
            
            {loading && <div className="loadingText">Loading...</div>}
            <div className="navContainer"><NavLinks /></div>
            <div className="productsCards">

                {products.map((p)=> (
                    <Product 
                        key={p.id}
                        imgSrc= {`${import.meta.env.VITE_API_URL}${p.imageUrl}`}
                        imgAlt= {`${p.name} image`}
                        name= {`${p.brand} ${p.name}`}
                        description= {p.type}
                        price= {p.price}
                    />                
            ))
            }
            </div>
        </div>
    )
    
}