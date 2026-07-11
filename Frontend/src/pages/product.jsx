import { useEffect, useState, useMemo, useCallback } from "react"
import { getAllproduct } from "../redux/thunks/productThunks"
import { addToCart } from "../redux/thunks/cartThunks"
import { getAllCategory } from "../redux/thunks/categoryThunks"
import { addToWishlist, removeWishlist, getWishlist } from "../redux/thunks/wishlistThunks"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProductCard from "../components/productCard"
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import "../style/product.css"


const Product = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { wishlist } = useSelector(state => state.wishlist)

  const { products, loading, error, totalPages, totalProducts } = useSelector(state => state.products)

  const [debouncedSearch, setDebouncedSearch] = useState("")

  const [search, setSearch] = useState("")
  const [SortOption, setSortOption] = useState("")
  const [currentPage, setCurrentPage] = useState(1);


  const { categories } = useSelector((state) => state.category)




  useEffect(() => {

    dispatch(
      getAllproduct({
        page: currentPage,
        search: debouncedSearch
      })
    );

  }, [
    dispatch,
    currentPage,
    debouncedSearch
  ]);


  useEffect(() => {

    setCurrentPage(1);

}, [debouncedSearch]);

  useEffect(() => {

    dispatch(getAllCategory());

    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getWishlist());
    }

  }, [dispatch]);





  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])




  // const filteredProducts = useMemo(() => {

  //   return products.filter((product) => {

  //     const matchCategory =
  //       selectedCategory === "All" ||
  //       product.category === selectedCategory

  //     const matchSearch =
  //       product.name
  //         .toLowerCase()
  //         .includes(
  //           debouncedSearch.toLowerCase()
  //         )

  //     return matchCategory && matchSearch
  //   })

  // }, [
  //   products,
  //   selectedCategory,
  //   debouncedSearch
  // ])


  const filteredProducts = products;

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
      e.stopPropagation();

      const token =
        localStorage.getItem("token");

      if (!token) {

        toast.warning(
          "Please login to add products to cart"
        );

        setTimeout(() => {
          navigate("/login");
        }, 700);

        return;
      }

      const result =
        await dispatch(
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

    },
    [dispatch, navigate]
  );




  const handleWishlist = useCallback(
    async (
      e,
      productId,
      isWishlisted
    ) => {

      e.preventDefault();
      e.stopPropagation();

      const token =
        localStorage.getItem("token");

      if (!token) {

        toast.warning(
          "Please login to access wishlist"
        );

        setTimeout(() => {
          navigate("/login");
        }, 700);

        return;
      }

      // existing logic
    },
    [dispatch, navigate]
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
            <span>{totalProducts}</span>
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


        {/* page count */}

        {/* PAGINATION */}

        {/* PAGINATION */}

        {
          totalPages > 1 && (

            <div className="pagination">

              <button
                className="pagination-btn"
                onClick={() =>
                  setCurrentPage((prev) => prev - 1)
                }
                disabled={currentPage === 1}
              >
                ← Previous
              </button>


              <div className="pagination-numbers">

                {
                  [...Array(totalPages)].map((_, index) => (

                    <button
                      key={index}

                      className={
                        currentPage === index + 1
                          ? "page-number active-page"
                          : "page-number"
                      }

                      onClick={() =>
                        setCurrentPage(index + 1)
                      }
                    >
                      {index + 1}
                    </button>

                  ))
                }

              </div>


              <button
                className="pagination-btn"
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }

                disabled={
                  currentPage === totalPages
                }
              >
                Next →
              </button>

            </div>

          )
        }

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