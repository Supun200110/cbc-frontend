import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate(); // it will navigate to the pages smoothly

    function handleLogin() {
        console.log("Email", email)
        console.log("Password", password) // Saving final email and password that user entered using useState

        axios.post(import.meta.env.VITE_BACKEND_URL +"/api/user/login", {
            email: email,
            password: password   //sending Email and Passsword to the backend
        }).then(
            (response)=>{
                console.log("Login Successful", response.data);
                toast.success("Login Successful");
                localStorage.setItem("token", response.data.token)

                const user = response.data.user; //taking the user data from the response
                if (user.role == "admin") {
                    //go to the admin page
                  navigate("/admin")
                }
                else{
                    //go to the home page
                    navigate("/")  
                }
            
            }
        ).catch(
            (error)=>{
                console.log("Login Failed", error.response.data) 
                toast.error(error.response.data.message || "Login Failed")
            }
        )   //using a promise taking the response 


        console.log("Login butten clicked")

    }
    return (
        <div className="w-full bg-red-300 h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex ">
            <div className=" w-[50%] h-full">
            </div>
            <div className=" w-[50%] h-full flex items-center justify-center">
                <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center  ">
                    <input onChange={(e) => setEmail(e.target.value)} className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px] " type="email" placeholder="Email" />
                    <input onChange={(e) => setPassword(e.target.value)} className="w-[400px] h-[50px] border border-white rounded-xl text-center " type="password" placeholder="Password" />
                    <button onClick={handleLogin} className="w-[400px] h-[50px] bg-green-500  text-white rounded-xl text-center m-[5px] cursor-pointer   ">Login</button>
                </div>
            </div>
        </div>
    )
}