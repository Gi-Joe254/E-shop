import { useEffect, useState } from "react";

import Nav from "../components/nav";
import { loadPublicProducts } from "../services/loadProducts";
import Product from "../components/productCard";

export default function Products() {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    
    const loadProducts = async()=> {
        const data = await loadPublicProducts()
        console.log(data)
        setLoading(true)
        setProducts(data)
    }
    useEffect(()=>{
        loadProducts()
    },[])
    return(
        <>
            <Nav />
            <div>Products Page</div>
            {loading && <div className="loadingText">Loading...</div>}

            {products.map((p)=> 
                <Product 
                    key={p.id}
                    imgSrc= ''
                    imgAlt= {`${p.name} image`}
                    name= {p.name}
                    description= {`${p.brand}, ${p.type}`}
                    price= {p.price}
                />
            )}
        </>
    )
}