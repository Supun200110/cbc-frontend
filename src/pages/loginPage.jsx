import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { useGoogleLogin } from "@react-oauth/google"
import { GrGoogle } from "react-icons/gr"

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate(); // it will navigate to the pages smoothly
    const loginWithGoogle = useGoogleLogin(
        {
            onSuccess: (res) => {
                setLoading(true)
                axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
                    accessToken: res.access_token
                }).then((response) => {
                    console.log("Login Successful", response.data);
                    toast.success("Login Successful");
                    localStorage.setItem("token", response.data.token)

                    const user = response.data.user; //taking the user data from the response
                    if (user.role == "admin") {
                        //go to the admin page
                        navigate("/admin");
                    }
                    else {
                        //go to the home page
                        navigate("/");
                    }
                    setLoading(false);
                })
            }
        }
    )

    function handleLogin() {
        console.log("Email", email)
        console.log("Password", password) // Saving final email and password that user entered using useState
        setLoading(true)
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
            email: email,
            password: password   //sending Email and Passsword to the backend
        }).then(
            (response) => {
                console.log("Login Successful", response.data);
                toast.success("Login Successful");
                localStorage.setItem("token", response.data.token)

                const user = response.data.user; //taking the user data from the response
                if (user.role == "admin") {
                    //go to the admin page
                    navigate("/admin")
                }
                else {
                    //go to the home page
                    navigate("/")
                }
                setLoading(false)

            }
        ).catch(
            (error) => {
                console.log("Login Failed", error)
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message || "Login Failed")
                } else {
                    toast.error("Server unreachable or Network Error")
                }
                setLoading(false)
            }
        )   //using a promise taking the response 


        console.log("Login butten clicked")

    }
    return (
        <div className="w-full bg-red-300 h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex flex-col md:flex-row ">
            <div className="hidden md:block md:w-[50%] h-full">
            </div>
            <div className=" w-full md:w-[50%] h-full flex items-center justify-center p-4">
                <div className="w-full max-w-[450px] h-auto min-h-[600px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center py-8 ">
                    <input onChange={(e) => setEmail(e.target.value)} className="w-full max-w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="email" placeholder="Email" />
                    <input onChange={(e) => setPassword(e.target.value)} className="w-full max-w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" type="password" placeholder="Password" />
                    <button onClick={handleLogin} className="w-full max-w-[400px] h-[50px] bg-green-500  text-white rounded-xl text-center m-[5px] cursor-pointer">
                        {loading ? "Loading..." : "Login"}
                    </button>
                    <button className="w-full max-w-[400px] h-[50px] bg-green-500  text-white rounded-xl text-center m-[5px] cursor-pointer flex justify-center items-center"
                        onClick={loginWithGoogle}>

                        <GrGoogle className="mr-[10px]" /> {loading ? "Loading..." : "Login with Google"}

                    </button>
                    <p className="text-gray-800 text-center m-[10px]">
                        Don't have an account yet? &nbsp;
                        <span className="text-green-500 cursor-pointer hover:text-green-700"><Link to={"/register"}>Register Now</Link></span>
                    </p>
                </div>
            </div>
        </div>
    )
}