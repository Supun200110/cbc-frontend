import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/product-card"

export default function ProductPage()
{
    const[productList,setProductList]=useState([])
    const[productsLoaded,setProductsLoaded]=useState(false)
    const[search,setSearch]=useState("")
    useEffect(
    ()=>{
        if(!productsLoaded)
        axios.get(import.meta.env.VITE_BACKEND_URL +"/api/product/").then(
            (res)=>{
                setProductList(res.data)
                setProductsLoaded(true)
            }
        )
    },[productsLoaded]
    )

    function searchProduct(){
        axios.get(import.meta.env.VITE_BACKEND_URL +"/api/product/search/"+search).then(
            (res)=>{
                setProductList(res.data.products)
                
            }
        )
    }

    return(
       <div className="h-full w-full">
            <div className="w-full h-[50px] flex justify-center items-center">
                <input type="text" placeholder="Search" className="w-[300px] h-[30px] border-2 border-gray-300 rounded-md p-2" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <button onClick={()=>{searchProduct()}} className="ml-2 bg-gray-700 text-white px-4 py-2 rounded-md">Search</button>
            <button onClick={()=>{setProductsLoaded(false)}} className="ml-2 bg-gray-700 text-white px-4 py-2 rounded-md">Reset</button>
            </div>

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