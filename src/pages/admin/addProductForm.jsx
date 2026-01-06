import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddProductForm() {

    const[productId, setProductId]=useState("");
    const[name, setname]=useState("");
    const[altName, setAltName]=useState("");
    const[price, setPrice]=useState("");
    const[labeledPrice, setLabeledPrice]=useState("");
    const[description, setDescription]=useState("");
    const[stock, setStock]=useState("");
    const[images, setImages]=useState([]);
    const navigate = useNavigate();

    async function handleSubmit(){

        const promisesArray=[]
        for(let i=0; i<images.length; i++){
            const promise = mediaUpload(images[i])
            promisesArray[i]=promise   
        }
        try{
        const result =await Promise.all(promisesArray)
        const altNameInArray = altName.split(",")
        const product={
            productId : productId,
            name : name,
            altName : altNameInArray,
            price : price,
            labeledPrice : labeledPrice,
            description : description,
            stock : stock,
            images:result
        }
        const token = localStorage.getItem("token")  
        console.log(token)

        await axios.post(import.meta.env.VITE_BACKEND_URL +"/api/product", product, {
            headers:{
                "Authorization": "Bearer " + token
            },
        })
        toast.success("Product added successfully");
        navigate("/admin/products");
    }catch(error){
        console.log(error);
        toast.error("Product Not Added");
    }
    }
    
    
    return (
        <div className='w-full h-full rounded-lg flex items-center justify-center     '>
            <div className='w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center'>
                <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Add Product</h1>
                <input 
                 value={productId}
                 onChange={
                    (e)=>{
                        setProductId(e.target.value)
                    }
                 }
                 className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="ProductID" />
                <input
                 value={name}
                 onChange={
                    (e)=>{
                        setname(e.target.value)
                    }
                 }

                 className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Product Name" />
                <input
                 value={altName}
                 onChange={
                    (e)=>{
                        setAltName(e.target.value)
                    }
                 }
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Alternative Names" />
                <input
                 value={price}
                 onChange={
                    (e)=>{
                        setPrice(e.target.value)
                    }
                 }  
                type="number"
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Price" />
                <input
                value={labeledPrice}
                onChange={
                    (e)=>{
                        setLabeledPrice(e.target.value)
                    }
                }
                type="number"
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Labelled Price" />
                <textarea
                value={description}
                onChange={
                    (e)=>{
                        setDescription(e.target.value)
                    }
                }
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Description" />
                <input
                type="file"
                onChange={
                    (e)=>{
                        setImages(e.target.files)
                    }
                }
                multiple
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Images" />
            
                <input
                value={stock}
                onChange={
                    (e)=>{
                        setStock(e.target.value)
                    }

                }
                type="number"
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" placeholder="Stock" />
                <div className='w-[400px] h-[100px] flex items-center justify-between rounded-lg'>
                    <Link to={"/admin/products"} className="bg-red-500 cursor-pointer text-white p-[10px] w-[180px] text-center rounded-lg m-[5px] hover:bg-red-600" >Cancel</Link>
                    <button onClick={handleSubmit} className="bg-green-500 cursor-pointer text-white p-[10px] w-[180px] text-center rounded-lg ml-[5px] hover:bg-green-600" >Add Product</button>
                </div>
            </div>
        </div>
    );

}