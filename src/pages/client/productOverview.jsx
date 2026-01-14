import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";
import toast from "react-hot-toast";
import ImageSlider from "../../components/imageSlider";
import getCart, { addToCart } from "../../utils/cart";

export default function ProductOverview(){
    const params =useParams()  //if url included id or else, it returns a json
    console.log(params.id)
    
    if(params.id==null){
        window.location.href="/products"
    }
const[product, setProduct]=useState(null)
const[status, setStatus]=useState("loading") //loaded,error,loading (3 stages)

useEffect(
    ()=>{
        if(status=="loading"){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then( //sending url + id form params
                (res)=>{
                    console.log(res)
                    setProduct(res.data.product)
                    setStatus("loaded")
                }
            ).catch(
                ()=>{
                    toast.error("Product is not avilable")
                    setStatus("error")
                }
            )
        }
    },[status]
)


return(
    <div className="w-full h-full  ">
        {
         status=="loading"&&<Loader/>


         }
         {
            status=="loaded"&&
            <div className="w-full h-full flex">
               <div className="w-[50%] h-full ">
                <ImageSlider images={product.images}/>

               </div>
               <div className="w-[50%] h-full p-[40px] ">
                <h1 className="text-3xl  text-center font-bold mb-[40px]">{product.name}{" | "}<span className="text-3xl mr-[20px] text-gray-500">{product.altName.join(" | ")}</span></h1>
                <div className="w-full flex justify-center mb-[40px]">
                    {
                        product.labeledPrice>product.price?
                        <>
                            <h2 className="text-2xl mr-[20px]  ">LKR: {product.price.toFixed(2)}</h2>
                            <h2 className="text-2xl line-through text-gray-500 ">LKR:{product.labeledPrice.toFixed(2)}</h2>
                            
                        </>:
                        <h2 className="text-2xl">LKR: {product.price.toFixed(2)}</h2>
                    } 
                </div>
                <p className="text-xl  text-center font-semibold text-gray-500 mb-[40px]">{product.description}</p>
                <div className="w-full flex justify-center items-center mb[40px] gap-[20px] ">
                    <button className=" bg-pink-800 border border-pink-800 cursor-pointer hover:bg-white hover:text-pink-800 text-white px-[20px] py-[10px] rounded-full " onClick={
                        ()=>{
                            addToCart(product, 1) 
                            toast.success("Product added to cart")
                            console.log(getCart)
                        }
                        }>Add to Cart</button>
                    <button className=" bg-pink-800 border border-pink-800 cursor-pointer hover:bg-white hover:text-pink-800 text-white px-[20px] py-[10px] rounded-full">Buy Now</button>
                </div>
               </div>

            </div>
         }
         {
            status=="error"&&<div>
                Error
            </div>
         }
   
        
        

    </div>
)
}