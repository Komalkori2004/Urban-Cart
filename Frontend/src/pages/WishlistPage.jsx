

import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";


import { getWishlist, removeWishlist } from "../redux/thunks/wishlistThunks";

import ProductCard from "../components/productCard";
import { addToCart } from "../redux/thunks/cartThunks"

import "../style/product.css"
const WishlistPage = () => {


    const dispatch = useDispatch()
    const { wishlist, loading, error } = useSelector((state) => state.wishlist)


    useEffect(() => {
        dispatch(getWishlist())
    }, [dispatch])





    const handleAddToCart = useCallback(
        async (
            e,
            productId
        ) => {

            e.preventDefault();

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

            if (
                result.meta.requestStatus ===
                "rejected"
            ) {

                toast.error(
                    result.payload ||
                    "Failed to add product"
                );
            }

        },
        [dispatch]
    );


    const handleRemoveWishlist =
        async (
            e,
            productId
        ) => {

            e.preventDefault();

            const result =
                await dispatch(
                    removeWishlist(
                        productId
                    )
                );

            if (
                result.meta.requestStatus ===
                "fulfilled"
            ) {

                toast.success(
                    "Removed from wishlist"
                );
            }

            if (
                result.meta.requestStatus ===
                "rejected"
            ) {

                toast.error(
                    "Failed to remove"
                );
            }
        };




    if (error) {
        return (
            <div className="empty-state">
                <h2>Something went wrong</h2>
                <p>{error}</p>
            </div>
        );
    }
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!loading && wishlist?.length === 0) {

        return (

            <div className="empty-state">

                <div className="empty-icon">
                    ♡
                </div>

                <h2>
                    Your Wishlist Awaits
                </h2>

                <p>
                    Discover luxury pieces
                    and save your favorites
                    for later.
                </p>

                <a
                    href="/products"
                    className="empty-btn"
                >
                    Explore Collection
                </a>

            </div>

        )
    }

    return (<>

        <div className="wishlist-page">

            <div className="container">

                <div className="shop-header">

                    <p className="shop-subtitle">
                        CURATED COLLECTION
                    </p>

                    <h1 className="shop-title">
                        Your Wishlist
                    </h1>

                    <p className="shop-description">

                        Save your favorite luxury
                        fashion, beauty and lifestyle
                        pieces for future purchase.

                    </p>

                </div>

                {/* <div className="wishlist-summary">

                    <div className="wishlist-count">

                        <span>
                            {wishlist.length}
                        </span>

                        <p>
                            SAVED ITEMS
                        </p>

                    </div>

                </div>

                <div className="wishlist-section-title">

                    <span></span>

                    <h3>
                        Recently Saved
                    </h3>

                    <span></span>

                </div> */}


                <div className="wishlist-info">

    <div className="wishlist-pill">

        <span>
            ♥ {wishlist.length}
        </span>

        <p>
            SAVED ITEMS
        </p>

    </div>

</div>

<h3 className="wishlist-heading">
    Recently Saved Products
</h3>
                <div className="product-container">

                    {
                        wishlist.map((product) => (

                            <ProductCard

                                key={product._id}

                                product={product}

                                isWishlisted={true}

                                onWishlist={(e) =>
                                    handleRemoveWishlist(
                                        e,
                                        product._id
                                    )
                                }

                                onAddToCart={(e) =>
                                    handleAddToCart(
                                        e,
                                        product._id
                                    )
                                }

                            />

                        ))
                    }

                </div>

            </div>

        </div>

    </>)
}

export default WishlistPage