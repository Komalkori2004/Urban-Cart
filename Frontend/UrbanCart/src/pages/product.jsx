import { useEffect, useState } from "react"
import { getAllproduct } from "../redux/thunks/productThunks"
import { addToCart } from "../redux/thunks/cartThunks"
import { getAllCategory } from "../redux/thunks/categoryThunks"
import { addToWishlist, removeWishlist, getWishlist } from "../redux/thunks/wishlistThunks"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import "../style/product.css"


const Product = () => {

    const dispatch = useDispatch()
    const [selectedCategory, setSelectedCategory] = useState("All")
    const { wishlist } = useSelector(state => state.wishlist)

    const { products, loading, error } = useSelector(state => state.products)

    const [debouncedSearch, setDebouncedSearch] = useState("")

    const [search, setSearch] = useState("")
    const [SortOption, setSortOption] = useState("")

    const { categories } = useSelector((state) => state.category)





    useEffect(() => {
        dispatch(getAllproduct())
        dispatch(getAllCategory())
        dispatch(getWishlist())
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

        <div className="shop-page">

            <div className="container">

                <div className="shop-header">

                    <p className="shop-subtitle">
                        PREMIUM COLLECTION
                    </p>

                    <h1 className="shop-title">
                        Discover Luxury Products
                    </h1>

                </div>



                <div className="filter-section">

                    <input
                        type="text"
                        placeholder="Search Product"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />



                    <select
                        value={SortOption}
                        onChange={(e) =>
                            setSortOption(e.target.value)
                        }

                        className="sort-select"
                    >

                        <option value="">
                            Sort Product
                        </option>

                        <option value="lowToHigh">
                            Price: Low to High
                        </option>

                        <option value="highToLow">
                            Price: High to Low
                        </option>

                    </select>

                </div>



                <div className="category-buttons">

                    <button
                        className={
                            selectedCategory === "All"
                                ? "active-category"
                                : ""
                        }
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
                                className={
                                    selectedCategory === category.name
                                        ? "active-category"
                                        : ""
                                }
                                onClick={() =>
                                    setSelectedCategory(category.name)
                                }
                            >
                                {category.name}
                            </button>

                        ))
                    }

                </div>
                <p className="product-count">
                    {ShortedProducts.length} Products Found
                </p>

                <div className="product-container">

                    {
                        ShortedProducts?.map((product) => (

                            <Link to={`/product/${product.slug}`} key={product._id}>
                                <div
                                    className="product-card"
                                    key={product._id}
                                >

                                    <div className="product-image-wrapper">

                                        <img
                                            src={product.images[0]?.url}
                                            alt={product.name}
                                            className="product-image"
                                        />

                                        <button
                                            className="wishlist-btn"
                                            onClick={async (e) => {
                                                e.preventDefault()

                                                const isWishlisted = wishlist.some(
                                                    (item) => item._id === product._id
                                                )

                                                if (isWishlisted) {
                                                    dispatch(removeWishlist(product._id))
                                                } else {
                                                    await dispatch(addToWishlist(product._id))
                                                    dispatch(getWishlist())
                                                }
                                            }}
                                        >
                                            {
                                                wishlist.some(
                                                    (item) => item._id === product._id
                                                )
                                                    ? "❤️"
                                                    : "🤍"
                                            }
                                        </button>

                                    </div>


                                    <div className="product-info">

                                        <h3>{product.name}</h3>



                                        <p className="product-brand">
                                            {product.brand}
                                        </p>



                                        <div className="price-section">

                                            <span className="price">
                                                ₹ {product.price}
                                            </span>


                                            {/* 
                                        <span className="old-price">
                                            ₹ 149999
                                        </span> */}

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

        </div>
    </>)
}

export default Product