import { TbTrash } from "react-icons/tb"
import getCart, { addToCart, getTotal, getTotalForLabelledPrice, removeFromCart } from "../../utils/cart"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CartPage() {
    const [cartLoaded, setCartLoaded] = useState(false)
    const [cart, setCart] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if (cartLoaded == false) {
            const cart = getCart()
            setCart(cart)
            setCartLoaded(true)
        }
    }, [cartLoaded]
    )
    return (
        <div className="w-full h-full flex justify-center p-[40px] ">
            <div className="lg:w-[700px] w-full ">
                {
                    cart.map((item, index) => {


                        return (

                            <div key={index} className="w-full lg:h-[100px] bg-white shadow-2xl  my-[50px] flex lg:flex-row flex-col justify-between items-center relative">
                                <button className="absolute lg:right-[-50px] right-4 bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer "
                                    onClick={() => {
                                        removeFromCart(item.productId)
                                        setCartLoaded(false)
                                    }}>
                                    <TbTrash />
                                </button>
                                <img src={item.image} className="lg:h-full h-[100px] aspect-square object-cover" />
                                <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                    <h1 className="text-xl font-bold">{item.name}</h1>
                                    <h2 className="text-lg text-gray-500">{item.altName?.join(" | ")}</h2>
                                    <h2 className="text-lg text-gray-500">LKR: {item.price.toFixed(2)} </h2>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex cursor-pointer mx[5px] items-center justify-center"
                                        onClick={() => {
                                            addToCart(item, -1)
                                            setCartLoaded(false)
                                        }}>-</button>
                                    <h1 className="text-xl font-bold mx-[5px]">{item.quantity}</h1>
                                    <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex cursor-pointer mx[5px] items-center justify-center"
                                        onClick={() => {
                                            addToCart(item, 1)
                                            setCartLoaded(false)
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
                    {/* Total */}
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <h1 className="text-lg font-medium text-gray-700">Subtotal</h1>
                        <h1 className="text-lg font-semibold text-gray-900">
                            LKR {getTotalForLabelledPrice().toFixed(2)}
                        </h1>
                    </div>

                    {/* Discount */}
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <h1 className="text-lg font-medium text-green-600">Discount</h1>
                        <h1 className="text-lg font-semibold text-green-600">
                            -LKR {(getTotalForLabelledPrice() - getTotal()).toFixed(2)}
                        </h1>
                    </div>

                    {/* Net Total */}
                    <div className="flex justify-between items-center py-4 border-t-2 border-gray-300 mt-2">
                        <h1 className="text-xl font-bold text-gray-800">Net Total</h1>
                        <h1 className="text-2xl font-bold text-blue-600">
                            LKR {getTotal().toFixed(2)}
                        </h1>
                    </div>

                    {/* Checkout Button */}
                    <div className="w-full flex justify-center mt-6">
                        <button
                            className="w-full max-w-xs bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-lg font-semibold rounded-lg h-12 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                            onClick={() => navigate("/checkout",
                                {
                                    state: {
                                        items: cart
                                    }
                                }
                            )}
                        >
                             Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
