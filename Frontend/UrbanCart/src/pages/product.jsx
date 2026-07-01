import { useEffect, useState, useMemo, useCallback } from "react"
import { getAllproduct } from "../redux/thunks/productThunks"
import { addToCart } from "../redux/thunks/cartThunks"
import { getAllCategory } from "../redux/thunks/categoryThunks"
import { addToWishlist, removeWishlist, getWishlist } from "../redux/thunks/wishlistThunks"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProductCard from "../components/productCard"

import { toast } from "sonner";

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
    const filteredProducts = useMemo(() => {

        return products.filter((product) => {

            const matchCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory

            const matchSearch =
                product.name
                    .toLowerCase()
                    .includes(
                        debouncedSearch.toLowerCase()
                    )

            return matchCategory && matchSearch
        })

    }, [
        products,
        selectedCategory,
        debouncedSearch
    ])


    const ShortedProducts = useMemo(() => {

        return [...filteredProducts].sort((a, b) => {

            if (SortOption === "lowToHigh") {
                return a.price - b.price
            }

            if (SortOption === "highToLow") {
                return b.price - a.price
            }

            return 0

        })

    }, [
        filteredProducts,
        SortOption
    ])




const handleAddToCart = useCallback(
    async (e, productId) => {

        e.preventDefault();

        const result = await dispatch(
            addToCart({
                productId,
                quantity: 1
            })
        );

        if (
            result.meta.requestStatus ===
            "fulfilled"
        ) {

            toast.success(
                "Product added to cart"
            );
        }

        if (
            result.meta.requestStatus ===
            "rejected"
        ) {

            toast.error(
                result.payload
            );
        }

    },
    [dispatch]
);


  const handleWishlist = useCallback(
    async (
        e,
        productId,
        isWishlisted
    ) => {

        e.preventDefault();

        if (isWishlisted) {

            const result =
                await dispatch(
                    removeWishlist(
                        productId
                    )
                );

            if (
                result.meta.requestStatus
                === "fulfilled"
            ) {

                toast.success(
                    "Removed from wishlist"
                );
            }

        } else {

            const result =
                await dispatch(
                    addToWishlist(
                        productId
                    )
                );

            if (
                result.meta.requestStatus
                === "fulfilled"
            ) {

                toast.success(
                    "Added to wishlist"
                );

                dispatch(
                    getWishlist()
                );
            }
        }

    },
    [dispatch]
);



  return (
  <div className="shop-page">

    <div className="container">

      {/* HERO */}

      <section className="shop-hero">

        <span className="shop-badge">
          PREMIUM COLLECTION
        </span>

        <h1 className="shop-title">
          Discover Luxury Products
        </h1>

        <p className="shop-description">
          Curated fashion, beauty and lifestyle collections
          designed for modern luxury.
        </p>

      </section>


      {/* FILTER BAR */}

      <section className="shop-filter-bar">

        <div className="shop-search">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="shop-sort">

          <select
            value={SortOption}
            onChange={(e) =>
              setSortOption(
                e.target.value
              )
            }
          >
            <option value="">
              Sort By
            </option>

            <option value="lowToHigh">
              Price : Low To High
            </option>

            <option value="highToLow">
              Price : High To Low
            </option>

          </select>

        </div>

      </section>


      {/* CATEGORY */}

      <section className="category-buttons">

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

        {categories.map((category) => (

          <button
            key={category._id}
            className={
              selectedCategory === category.name
                ? "active-category"
                : ""
            }
            onClick={() =>
              setSelectedCategory(
                category.name
              )
            }
          >
            {category.name}
          </button>

        ))}

      </section>


      {/* PRODUCT COUNT */}

   <div className="product-stats">

    <div className="stats-item">
        <span>{ShortedProducts.length}</span>
        <p>Exclusive Pieces</p>
    </div>

    <div className="stats-divider"></div>

    <div className="stats-item">
        <span>{selectedCategory}</span>
        <p>Collection</p>
    </div>

</div>


      {/* PRODUCTS */}

      <section className="product-container">

        {ShortedProducts.map((product) => {

          const isWishlisted =
            wishlist.some(
              (item) =>
                item._id === product._id
            );

          return (

            <ProductCard
              key={product._id}
              product={product}
              isWishlisted={isWishlisted}
              onWishlist={(e) =>
                handleWishlist(
                  e,
                  product._id,
                  isWishlisted
                )
              }
              onAddToCart={(e) =>
                handleAddToCart(
                  e,
                  product._id
                )
              }
            />

          );
        })}

      </section>


      {/* EMPTY STATE */}

      {!loading &&
        ShortedProducts.length === 0 && (

          <div className="empty-products">

            <h2>
              No Products Found
            </h2>

            <p>
              Try another search or category.
            </p>

          </div>

        )}


      {/* LOADER */}

      {loading && (

        <div className="shop-loader">

          <p>
            Loading Products...
          </p>

        </div>

      )}


      {/* ERROR */}

      {error && (

        <div className="shop-error">

          <p>
            {error}
          </p>

        </div>

      )}

    </div>

  </div>
)
}

export default Product