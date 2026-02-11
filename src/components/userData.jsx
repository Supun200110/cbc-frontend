import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token != null) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
                headers: {
                    Authorization: "Bearer " + token,
                }
            }).then((response) => {
                setUser(response.data.user);
            }).catch((error) => {
                console.log(error);
                setUser(null);
            });
        }
    }, []);

    return (
        <>
            {user == null ? (
                <div className="h-full flex justify-center items-center flex-row gap-4">
                    <Link to="/login" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 tracking-wide">
                        Login
                    </Link>
                    <Link to="/register" className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-2 rounded-full font-semibold shadow-sm hover:bg-blue-50 hover:shadow-md hover:scale-105 transition-all duration-300 tracking-wide">
                        Register
                    </Link>
                </div>
            ) : (
                <div className="h-full flex justify-center items-center flex-row gap-4">
                    <span className="font-medium text-gray-700 hidden lg:block">Hi, {user.firstName || 'User'}</span>
                    <button
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 hover:scale-105 transition-all duration-300 tracking-wide"
                        onClick={() => {
                            localStorage.removeItem("token");
                            setUser(null);
                            window.location = "/";
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </>
    );
}