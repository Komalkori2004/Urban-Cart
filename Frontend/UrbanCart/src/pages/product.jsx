import { useEffect, useState } from "react"
import { getAllproduct } from "../redux/thunks/productThunks"
import { addToCart } from "../redux/thunks/cartThunks"
import { getAllCategory } from "../redux/thunks/categoryThunks"
import { addToWishlist, removeWishlist, getWishlist } from "../redux/thunks/wishlistThunks"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProductCard from "../components/productCard"

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
                        ShortedProducts?.map((product) => {

                            const isWishlisted =
                                wishlist.some(
                                    item => item._id === product._id
                                );

                            return (

                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    isWishlisted={isWishlisted}

                                    onWishlist={async (e) => {

                                        e.preventDefault();

                                        if (isWishlisted) {

                                            dispatch(
                                                removeWishlist(product._id)
                                            );

                                        } else {

                                            await dispatch(
                                                addToWishlist(product._id)
                                            );

                                            dispatch(getWishlist());
                                        }
                                    }}

                                    onAddToCart={(e) => {

                                        e.preventDefault();

                                        dispatch(
                                            addToCart({
                                                productId: product._id,
                                                quantity: 1
                                            })
                                        );
                                    }}
                                />
                            );
                        })
                    }

                </div>
            </div>

        </div>
    </>)
}

export default Product