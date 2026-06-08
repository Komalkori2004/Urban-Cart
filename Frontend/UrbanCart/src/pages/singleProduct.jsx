
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getsingleProduct, getAllproduct } from '../redux/thunks/productThunks'
import { Link } from "react-router-dom"

import { useNavigate } from "react-router-dom"
import { addToCart } from "../redux/thunks/cartThunks"
import { addReview } from '../redux/thunks/reviewThunk'

import { getWishlist, removeWishlist, addToWishlist } from "../redux/thunks/wishlistThunks"
import "../style/singleProduct.css"


const SingleProduct = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { slug } = useParams()
    const [rating, setRating] = useState(0)

    const [comment, setComment] = useState("")

    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState("")
    const { wishlist } = useSelector((state) => state.wishlist)
    const { loading: reviewLoadind } = useSelector(state => state.review)


    const { singleProduct, products, loading, error } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getsingleProduct(slug))
        dispatch(getAllproduct())

    }, [slug, dispatch])


    const incressQty = () => {

        if (quantity < singleProduct.stock) {
            setQuantity(quantity + 1)
        }
    }
    const decressQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                productId: singleProduct._id,
                quantity
            })
        )
        navigate("/cart")
    }

    const relatedProducts = products.filter((product) =>

        product.category === singleProduct.category &&
        product._id !== singleProduct._id


    ).slice(0, 4)


    useEffect(() => {
        setQuantity(1)

        if (singleProduct?.images?.length > 0) {
            setActiveImage(singleProduct.images[0].url)

        }
    }, [singleProduct])


    const isWishlisted = wishlist.some(
        (item) => item._id === singleProduct._id
    )

    const handleWishlist = async () => {

        if (isWishlisted) {

            dispatch(
                removeWishlist(singleProduct._id)
            )

        } else {

            await dispatch(
                addToWishlist(singleProduct._id)
            )

            dispatch(getWishlist())
        }
    }



    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        console.log("Button clicked")
        console.log("Rating:", rating)
        console.log("Comment:", comment)

        if (!rating || !comment) {
            return alert("Please enter rating and comment")
        }


        console.log("Before Dispatch")

        const result = await dispatch(
            addReview({
                productId: singleProduct._id,
                rating,
                comment
            })
        )

        console.log("After Dispatch")
        console.log(result)
        if (
            result.meta.requestStatus ===
            "fulfilled"
        ) {

            dispatch(
                getsingleProduct(slug)
            )

            setRating(0)
            setComment("")
        }
    }
    // dispatch(addToReview({rating,comment,singleProduct._id}))






    // if (loading) {
    //     return <h2>Loading...</h2>
    // }
    // if (error) {
    //     return <h2>{error}</h2>
    // }

    return (
        <>
            <div className="container">


                <div className="single-product-container">

                    <div className="single-product-image">

                        <div className="thumbnail-list">

                            {singleProduct.images?.map((image) => (

                                <img
                                    key={image.public_id}
                                    src={image.url}
                                    alt="thumbnail"
                                    className={
                                        activeImage === image.url
                                            ? "active-thumb"
                                            : ""
                                    }
                                    onClick={() =>
                                        setActiveImage(image.url)
                                    }
                                />

                            ))}

                        </div>

                        <div className="main-image">
                            {activeImage && (
                                <img
                                    src={activeImage}
                                    alt={singleProduct.name}
                                />
                            )}
                        </div>

                    </div>

                    <div className="single-product-content">

                        <p className="product-label">
                            Luxury Collection
                        </p>

                        <h1>
                            {singleProduct.name}
                        </h1>

                        <p className="product-brand">
                            {singleProduct.brand}
                        </p>

                        <h2 className="product-price">
                            ₹ {singleProduct.price}
                        </h2>
                        <div className="product-rating">

                            <span>
                                ⭐ {singleProduct.ratings?.toFixed(1)}
                            </span>

                            <span>
                                ({singleProduct.numReviews} Reviews)
                            </span>

                        </div>



                        <p className="product-description">
                            {singleProduct.description}
                        </p>

                        <div className="product-meta">

                            <span>
                                Category:
                                {singleProduct.category}
                            </span>

                            <span
                                className={
                                    singleProduct.stock > 0
                                        ? "Available"
                                        : "out-stock"
                                }
                            >
                                {
                                    singleProduct.stock > 0
                                        ? `${singleProduct.stock} Available`
                                        : "Out Of Stock"
                                }
                            </span>

                        </div>

                        <div className="quantity-box">
                            <button onClick={decressQty}>-</button>
                            <span>{quantity}</span>
                            <button onClick={incressQty}>+</button>
                        </div>


                        <div className="product-actions">

                            <button
                                className="add-cart-btn"
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </button>

                            <button
                                className="wishlist-single-btn"
                                onClick={handleWishlist}
                            >
                                {isWishlisted
                                    ? "❤️ Wishlisted"
                                    : "🤍 Add Wishlist"
                                }
                            </button>

                            <button className="buy-now-btn">
                                Buy Now
                            </button>

                        </div>

                    </div>

                </div>
                <div className="review-form">

                    <h3>
                        Write A Review
                    </h3>

                    <div className="rating-select">

                        <select
                            value={rating}
                            onChange={(e) =>
                                setRating(e.target.value)
                            }
                        >

                            <option value="0">
                                Select Rating
                            </option>

                            <option value="1">
                                1 Star
                            </option>

                            <option value="2">
                                2 Stars
                            </option>

                            <option value="3">
                                3 Stars
                            </option>

                            <option value="4">
                                4 Stars
                            </option>

                            <option value="5">
                                5 Stars
                            </option>


                        </select>

                    </div>

                    <textarea

                        placeholder="Write your review..."

                        value={comment}

                        onChange={(e) =>
                            setComment(e.target.value)
                        }

                    />

                    <button
                        onClick={handleReviewSubmit}

                    >
                        {reviewLoadind ? "Submitting..." : "Submit Review"}
                    </button>

                </div>
            </div>
            <section className="reviews-section">

                <div className="container">

                    <h2 className="reviews-title">
                        Customer Reviews
                    </h2>

                    {
                        singleProduct.reviews?.length > 0 ? (

                            <div className="reviews-list">

                                {
                                    singleProduct.reviews.map((review) => (

                                        <div
                                            className="review-card"
                                            key={review._id}
                                        >

                                            <h4>
                                                {review.name}
                                            </h4>

                                            <p>
                                                {"⭐".repeat(review.rating)}
                                            </p>

                                            <p>
                                                {review.comment}
                                            </p>

                                        </div>

                                    ))
                                }

                            </div>

                        ) : (

                            <p>
                                No Reviews Yet
                            </p>

                        )
                    }

                </div>


            </section>

            <section className="related-products-section">

                <div className="container">

                    <div className="related-products">

                        <h2>
                            You May Also Like
                        </h2>

                        <div className="related-grid">

                            {relatedProducts.map((product) => (

                                <Link
                                    key={product._id}
                                    to={`/product/${product.slug}`}
                                    className="related-card"
                                >

                                    <img
                                        src={product.images?.[0]?.url}
                                        alt={product.name}
                                    />

                                    <h3>{product.name}</h3>

                                    <p>₹ {product.price}</p>

                                </Link>

                            ))}

                        </div>

                    </div>
                </div>

            </section>






        </>)
}

export default SingleProduct