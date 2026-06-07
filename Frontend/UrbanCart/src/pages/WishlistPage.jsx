

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { getWishlist, removeWishlist } from "../redux/thunks/wishlistThunks";

import "../style/product.css"
const WishlistPage = () => {


    const dispatch = useDispatch()
    const { wishlist, loading, error } = useSelector((state) => state.wishlist)


    useEffect(() => {
        dispatch(getWishlist())
    }, [dispatch])

    if (!loading && wishlist.length === 0) {
        return (
            <div className="empty-state">

                <h2>
                    Your Wishlist Is Empty
                </h2>

                <p>
                    Save your favorite products here.
                </p>

            </div>
        )
    }

    return (<>

        <div className="wishlist-page">

            <div className="container">

                <div className="shop-header">
                    ...
                </div>

                <p className="product-count">
                    {wishlist.length} Products Found
                </p>


                <div className="product-container">

                    {wishlist.map((product) => (

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

                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() =>
                                        dispatch(
                                            removeWishlist(product._id)
                                        )
                                    }
                                >
                                    Remove From Wishlist
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    </>)
}

export default WishlistPage