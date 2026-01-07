import axios from "axios"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function AdminProductsPage(){

    const[products, setProducts] = useState([]) 
    const[loaded,setLoaded]=useState(false) //run once 
    const navigate=useNavigate()
    useEffect(     //thing that  should showing when the loading page first time
        ()=>{
        if(!loaded){ //for refreshing 
            axios.get(import.meta.env.VITE_BACKEND_URL +"/api/product").then(
        (response)=>{
            console.log(response.data)
            setProducts(response.data)
            setLoaded(true) //run again because value is changed 
        }
    ) }
        },[loaded]
    )   
    async function deleteProduct(id){
        const token=localStorage.getItem("token")
        if(token==null){
            toast.error("please login to delete a product")
            return
        }
        try{

            await axios.delete(import.meta.env.VITE_BACKEND_URL +"/api/product/"+id,
            {
            headers:{
                "Authorization": "Bearer " + token
            }
        })  
            setLoaded(false)
            toast.success("Product Deleted Successfully")
            
        }catch(error){
            console.log(error)
            toast.error("Error Deleteing Product")
            return
        }
    
        
    }

    
   
    return(
        <div className="w-full h-full  rounded-lg relative " >
            <Link to={"/admin/addProduct"} className="text-white bg-gray-700 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700 absolute right-5 bottom-5">
                <FaPlus />
            </Link>
        <div className="w-full h-[calc(100vh-100px)] overflow-auto">
            {loaded && <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">labled Price</th>
                        <th className="p-2">Stock</th>
                        <th className="p-3">Actions</th>

                    </tr>

                </thead>
                <tbody>
                    {
                products.map( //can take each element form the array and  change each one by one
                    (product,index)=>{
                       
                        return(
                            <tr key={index} className= "border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100 " >
                                <td className="p-2">{product.productId}</td>
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2">{product.labeledPrice}</td>
                                <td className="p-2">{product.stock}</td> 
                                <td className="p-2">
                                    <div className="w-full h-full flex justify-center ">
                                        <FaRegTrashAlt onClick={()=>deleteProduct(product.productId)} className="text-[25px] m-[10px] hover:text-red-600"/> 
                                        <GrEdit 
                                            onClick={
                                                ()=>{
                                                    navigate("/admin/editProduct",{
                                                state:product
                                            })
                                         }} className="text-[25px] m-[10px] hover:text-blue-500"/>
                                    </div>
                                </td>       
                            </tr> 
                                
                           //each mapping elemnt should have unique key for react to identify each element
                        )
                    }
                )
              }

                </tbody>
            </table>}
            {
                !loaded && 
                <Loader/>
            }
            </div> 
              
        </div>
    )

}
//https://xkotxgbpncffkcnmyigy.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrb3R4Z2JwbmNmZmtjbm15aWd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MTQ4NDcsImV4cCI6MjA4MzE5MDg0N30.Cp5eD6sNdFmXmhQvpJfbX42ggLbwgEzWTLDvc5m97RY