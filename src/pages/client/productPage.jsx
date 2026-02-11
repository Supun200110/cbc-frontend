import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/product-card"

export default function ProductPage() {
    const [productList, setProductList] = useState([])
    const [productsLoaded, setProductsLoaded] = useState(false)
    const [search, setSearch] = useState("")
    useEffect(
        () => {
            if (!productsLoaded)
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/").then(
                    (res) => {
                        setProductList(res.data)
                        setProductsLoaded(true)
                    }
                )
        }, [productsLoaded]
    )

    function searchProduct() {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search).then(
            (res) => {
                setProductList(res.data.products)

            }
        )
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 my-[50px]">

            <div className="max-w-7xl mx-auto mb-8">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full sm:w-96 h-12 border-2 border-gray-300 rounded-lg px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && searchProduct()}
                        />
                        <div className="flex gap-4">
                            <button
                                onClick={() => { searchProduct() }}
                                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center gap-2"
                            >
                                🔍 Search
                            </button>
                            <button
                                onClick={() => { setProductsLoaded(false); setSearch('') }}
                                className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 px-8 py-3 rounded-xl font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center gap-2"
                            >
                                🔄 Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {
                productsLoaded ?
                    <div className="max-w-7xl mx-auto">
                        {productList.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {
                                    productList.map(
                                        (product) => {
                                            return (
                                                <ProductCard key={product.productId} product={product} />
                                            )
                                        }
                                    )
                                }
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                                <p className="text-gray-500">Try adjusting your search terms</p>
                            </div>
                        )}
                    </div>
                    :
                    <Loader />
            }

        </div>
    )
}
