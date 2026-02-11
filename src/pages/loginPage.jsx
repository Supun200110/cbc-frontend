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
        <div className="w-full h-screen flex flex-col md:flex-row shadow-2xl overflow-hidden bg-[url(/login-bg.jpg)] bg-cover bg-center relative">
            
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-0"></div>

            
            <div className="hidden md:flex md:w-[50%] h-full justify-center items-center flex-col p-8 relative z-10">
                <div className="w-full max-w-[400px] ">
                    <img src="/logo.png" alt="Beauty Care Logo" className=" rounded-full w-full h-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl" />
                </div>
            </div>

            
            <div className="w-full md:w-[50%] h-full flex items-center justify-center p-4 relative z-10">
                <div className="w-full max-w-[450px] h-auto min-h-[500px] bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl flex flex-col justify-center items-center py-10 px-6 z-10 relative border border-white/20">

                    <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-wide drop-shadow-sm">Welcome Back</h2>

                    
                    <div className="w-full max-w-[400px] mb-4">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-[50px] bg-white/60 border border-transparent focus:border-green-400 rounded-xl px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all font-medium"
                            type="email"
                            placeholder="Email Address"
                        />
                    </div>

                    
                    <div className="w-full max-w-[400px] mb-6">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-[50px] bg-white/60 border border-transparent focus:border-green-400 rounded-xl px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all font-medium"
                            type="password"
                            placeholder="Password"
                        />
                    </div>

                   
                    <button
                        onClick={handleLogin}
                        className="w-full max-w-[400px] h-[50px] bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-green-500/30 transform active:scale-[0.98] transition-all duration-200 mb-4"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                
                    <button
                        className="w-full max-w-[400px] h-[50px] bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl shadow-md border border-gray-200 flex justify-center items-center transform active:scale-[0.98] transition-all duration-200 mb-6 group"
                        onClick={loginWithGoogle}
                    >
                        <GrGoogle className="mr-3 text-xl text-red-500 group-hover:scale-110 transition-transform" />
                        <span>{loading ? "Processing..." : "Continue with Google"}</span>
                    </button>

                    
                    <div className="w-full max-w-[400px] flex flex-col items-center gap-3 text-sm font-medium">
                        <p className="text-gray-700">
                            Don't have an account?{" "}
                            <span className="text-green-600 cursor-pointer hover:text-green-700 hover:underline transition-colors">
                                <Link to={"/register"}>Register Now</Link>
                            </span>
                        </p>
                        <p className="text-gray-600 cursor-pointer hover:text-green-600 hover:underline transition-colors">
                            <Link to={"/forget"}>Forgot Password?</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}