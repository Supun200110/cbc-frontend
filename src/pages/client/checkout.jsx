import { TbTrash } from "react-icons/tb"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state.items);
    const [cartRefresh, setCartRefresh] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    function placeOrder() {
        const orderData = {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            billItems: []
        }
        for (let i = 0; i < cart.length; i++) {
            orderData.billItems[i] = {
                productId: cart[i].productId,
                quantity: cart[i].quantity
            }
        }
        const token = localStorage.getItem("token");
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(() => {
            toast.success("Order placed Successfully");
            navigate("/");
        }).catch((error) => {
            console.log(error);
            toast.error("Order placement failed");
        })
    }

    function getTotal() {
        let total = 0
        cart.forEach((item) => {
            total += item.price * item.quantity
        })
        return total
    }
    function getTotalForLabelledPrice() {
        let total = 0
        cart.forEach((item) => {
            total += item.labeledPrice * item.quantity
        })
        return total
    }

    return (
        <div className="w-full h-full flex justify-center p-[40px] ">
            <div className="w-[700px] ">
                {
                    cart.map((item, index) => {


                        return (

                            <div key={index} className="w-full h-[100px] bg-white shadow-2xl  my-[50px] flex justify-between items-center relative">
                                <button className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer "
                                    onClick={() => {
                                        const newCart = cart.filter((product) => product.productId !== item.productId)
                                        setCart(newCart)

                                    }}>
                                    <TbTrash />
                                </button>
                                <img src={item.image} className="h-full aspect-square object-cover" />
                                <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                    <h1 className="text-xl font-bold">{item.name}</h1>
                                    <h2 className="text-lg text-gray-500">{item.altName?.join(" | ")}</h2>
                                    <h2 className="text-lg text-gray-500">LKR: {item.price.toFixed(2)} </h2>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex cursor-pointer mx[5px] items-center justify-center"
                                        onClick={() => {
                                            const newCart = cart
                                            newCart[index].quantity -= 1
                                            if (newCart[index].quantity <= 0) newCart[index].quantity = 1
                                            setCart(newCart)
                                            setCartRefresh(!cartRefresh)

                                        }}>-</button>
                                    <h1 className="text-xl font-bold mx-[5px]">{item.quantity}</h1>
                                    <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex cursor-pointer mx[5px] items-center justify-center"
                                        onClick={() => {

                                            const newCart = cart
                                            newCart[index].quantity += 1
                                            setCart(newCart)
                                            setCartRefresh(!cartRefresh)

                                        }}>+</button>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <h1 className="text-xl w-full text-end pr-2 ">{(item.price * item.quantity).toFixed(2)}</h1>
                                </div>
                            </div>
                        )
                    }
                    )
                }
                <div className="w-full bg-white rounded-xl shadow-lg p-6 mt-6 border border-gray-200">
                    
                    <div className="space-y-3">
                        
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <h1 className="text-lg font-medium text-gray-700">Subtotal</h1>
                            <h1 className="text-lg font-semibold text-gray-900">
                                LKR {getTotalForLabelledPrice().toFixed(2)}
                            </h1>
                        </div>

                        
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <h1 className="text-lg font-medium text-green-600">Discount</h1>
                            <h1 className="text-lg font-semibold text-green-600">
                                -LKR {(getTotalForLabelledPrice() - getTotal()).toFixed(2)}
                            </h1>
                        </div>

                        
                        <div className="flex justify-between items-center py-4 border-t-2 border-gray-300 mt-2">
                            <h1 className="text-xl font-bold text-gray-800">Net Total</h1>
                            <h1 className="text-2xl font-bold text-blue-600">
                                LKR {getTotal().toFixed(2)}
                            </h1>
                        </div>
                    </div>

                    
                    <div className="mt-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                            <input
                                className="w-full h-12 border border-gray-300 rounded-lg px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Phone Number</label>
                            <input
                                className="w-full h-12 border border-gray-300 rounded-lg px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Address</label>
                            <textarea
                                className="w-full min-h-[100px] border border-gray-300 rounded-lg p-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your delivery address"
                            />
                        </div>
                    </div>

                    
                    <div className="w-full flex justify-center mt-8">
                        <button
                            className="w-full max-w-xs bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-lg font-semibold rounded-lg h-12 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                            onClick={() => placeOrder()}
                        >
                             Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
