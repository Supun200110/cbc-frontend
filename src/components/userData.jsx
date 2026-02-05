import { useState } from "react";

export default function UserData(){
    const[user,setUser]=useState(null);
    
    return(
        <>
    {user==null?(
        <div className="h-full flex justify-center items-center flex-row">
            <Link to="/login" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Login</Link>
            <Link to="/register" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ml-4">Register</Link>
        </div>
    ):(
    <div className="h-full flex justify-center items-center flex-row">
       <Link to="/profile" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Profile</Link>
       <Link to="/logout" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ml-4">Logout</Link>
    </div>
    )}
    </>
    )
}