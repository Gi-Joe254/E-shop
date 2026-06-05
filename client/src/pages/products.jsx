import { useEffect, useState } from "react";
import './products.css'
import Nav from "../components/nav";
import { loadPublicProducts } from "../services/loadProducts";
import Product from "../components/productCard";
import NavLinks from "../components/navLinks";
import { motion } from 'framer-motion'

const sectionVars = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.7,
            staggerChildren: 0.12
        }
    }
}

const headerVars = {
    hidden: {
        opacity: 0,
        y: -15
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
}

const textVars = {
    hidden: {
        opacity: 0,
        y: 10
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
}

const buttonVars = {
    hidden: {
        opacity: 0,
        y: 10
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    },
    whileHover: {
        y: -4,
        scale: 1.02,
        transition: {
            duration: 0.25
        }
    }
}

const cardVars = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
}

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
        <motion.div 
            className="productsPage"
            variants={sectionVars}
            initial='hidden'
            whileInView='visible'
            viewport={{once: true, amount: 0.3}}
        >
            
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
                        price= {`Ksh${p.price}.00`}
                    />                
            ))
            }
            </div>
        </motion.div>
    )
    
}