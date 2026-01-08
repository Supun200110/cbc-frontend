import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/product-card"

export default function ProductPage()
{
    const[productList,setProductList]=useState([])
    const[productsLoaded,setProductsLoaded]=useState(false)
    useEffect(
    ()=>{
        if(!productsLoaded)
        axios.get(import.meta.env.VITE_BACKEND_URL +"/api/product").then(
            (res)=>{
                setProductList(res.data)
                setProductsLoaded(true)
            }
        )
    },[productsLoaded]
    )
    return(
       <div className="h-full w-full">
        {
            productsLoaded? //if products is loaded the show div otherwise show loader fuction
            <div className="w-full h-full flex flex-wrap justify-center ">
                {
                    productList.map(
                        (product)=>{
                            return(
                            <ProductCard key={product.productId} product={product}/>
                            )
                        }

                    )
                }

            </div>
            :
            <Loader/>
}

       </div>
    )
}