import { useState } from "react"
import toast from "react-hot-toast"
import mediaUpload from "../utils/mediaUpload"




export default function Testing(){
    const[file,setFile]=useState(null)
   

    function handleUpload(){
        mediaUpload(file).then( //pase the latetst file to promise called mediaIpload.jsx
            (url)=>{
                console.log("File Uploaded Successfully", url);
                toast.success("File Uploaded Successfully")
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("File Not Uploaded" )
            }
        )
    }
    return(
        <div className ='w-full h-screen flex flex-col justify-center items-center'>
            <input type="file" onChange={
                (e)=>{
                    console.log(e.target.files[0])
                    setFile(e.target.files[0])
                }
            } />
            <button onClick={handleUpload} className="bg-gray-700 text-white p-2 rounded-lg cursor-pointer">Upload</button>
        </div>
    )
}
