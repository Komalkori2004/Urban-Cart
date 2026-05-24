import { useEffect, useState } from "react"
import { getAllproduct } from "../redux/thunks/productThunks"
import { addToCart } from "../redux/thunks/cartThunks"
import { getAllCategory } from "../redux/thunks/categoryThunks"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"


const Product = () => {

    const dispatch = useDispatch()
    const [selectedCategory, setSelectedCategory] = useState("All")

    const { products, loading, error } = useSelector(state => state.products)

    const [debouncedSearch, setDebouncedSearch] = useState("")

    const [search, setSearch] = useState("")
    const [SortOption, setSortOption] = useState("")

    const { categories } = useSelector((state) => state.category)





    useEffect(() => {
        dispatch(getAllproduct())
        dispatch(getAllCategory())
    }, [dispatch])




    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)
        return () => clearTimeout(timer)
    }, [search])

    const filteredProducts =
        products.filter((product) => {
            const matchCategory = selectedCategory === "All" || product.category === selectedCategory

            const matchSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase())

            return matchCategory && matchSearch


        })


    const ShortedProducts =
        [...filteredProducts].sort((a, b) => {
            if (SortOption === "lowToHigh") {
                return a.price - b.price
            }
            if (SortOption === "highToLow") {
                return b.price - a.price
            }
            return 0
        })






    if (loading) {
        return <h2>Loading....</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    return (<>

        <div>

            <h2>
                all Product
            </h2>
            <input type="text"
                placeholder="Search Product"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"

            />

            <select value={SortOption} onChange={(e) => setSortOption(e.target.value)} >
                <option value="">Sort Product</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
            </select>

            <div className="category-buttons">

                <button
                    onClick={() =>
                        setSelectedCategory("All")
                    }
                >
                    All
                </button>

                {
                    categories.map((category) => (

                        <button

                            key={category._id}

                            onClick={() =>
                                setSelectedCategory(
                                    category.name
                                )
                            }
                        >
                            {category.name}
                        </button>

                    ))
                }

            </div>

            <div className="product-container">

                {
                  ShortedProducts?.map((product) => (

                        <Link to={`/product/${product.slug}`} key={product._id}>
                            <div
                                className="product-card"
                                key={product._id}
                            >

                                <img
                                    src={product.images[0]?.url}
                                    alt={product.name}
                                    className="product-image"
                                />



                                <div className="product-info">

                                    <h3>{product.name}</h3>



                                    <p className="product-brand">
                                        {product.brand}
                                    </p>



                                    <div className="price-section">

                                        <span className="price">
                                            ₹ {product.price}
                                        </span>



                                        <span className="old-price">
                                            ₹ 149999
                                        </span>

                                    </div>



                                    <p className="stock">

                                        {
                                            product.stock > 0
                                                ? "In Stock"
                                                : "Out Of Stock"
                                        }

                                    </p>



                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            dispatch(addToCart({
                                                productId: product._id,

                                                quantity: 1
                                            }))
                                        }}
                                    >
                                        Add To Cart
                                    </button>

                                </div>

                            </div>
                        </Link>

                    ))
                }

            </div>

        </div>
    </>)
}

export default Product