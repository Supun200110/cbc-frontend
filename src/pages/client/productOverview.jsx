import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
const navigate =useNavigate();
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
            <div className="w-full h-full flex flex-col lg:flex-row my-[50px]">
                <h1 className=" lg:hidden text-3xl  text-center font-bold mb-[40px]">{product.name}{" | "}<span className="text-3xl mr-[20px] text-gray-500">{product.altName.join(" | ")}</span></h1>

               <div className="w-full lg:h-full lg:w-[50%]   ">
                <ImageSlider images={product.images}/>

               </div>
               <div className="w-full h-full lg:w-[50%] lg:h-full p-[40px]  pt-[100px]">
                <h1 className="hidden lg:block text-3xl  text-center font-bold mb-[40px]">{product.name}{" | "}<span className="text-3xl mr-[20px] text-gray-500">{product.altName.join(" | ")}</span></h1>
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
                    <button 
                    onClick={()=>{
                        navigate("/checkout",{
                            state:{
                                items :[{
                                    productId : product.productId,
                                    name : product.name,
                                    altNames:product.altNames,
                                    price:product.price,
                                    labeledPrice:product.labeledPrice,
                                    image:product.images[0],
                                    quantity:1
                                }]
                            }
                        })
                    }}
                    className=" bg-pink-800 border border-pink-800 cursor-pointer hover:bg-white hover:text-pink-800 text-white px-[20px] py-[10px] rounded-full">Buy Now</button>
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