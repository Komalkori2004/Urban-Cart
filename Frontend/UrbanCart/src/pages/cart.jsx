import React from 'react'

import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { resetCoupon } from '../redux/feature/couponSlice'
import { getCart, updateCart, removeCart } from '../redux/thunks/cartThunks'
import { applyCoupon } from '../redux/thunks/couponThunk'
import { useEffect, useState } from 'react'
import { toast } from "sonner";


import "../style/cart.css"


const CartPage = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [couponCode, setCouponCode] = useState("")
    const { items, loading, error } = useSelector((state) => state.cart)
    const {
        couponCode: appliedCoupon,
        discount,
        finalAmount,
        loading: couponLoading
    } = useSelector(
        (state) => state.coupon
    )


    console.log("coupon state", {
        appliedCoupon,
        discount,
        finalAmount
    });

    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])

    // if (loading) {
    //     return <h2>Loading...</h2>
    // }
    // if (error) {
    //     return <h2>{error}</h2>
    // }
    // if (items.length == 0) {
    //     return (
    //         <div>

    //             <h2>
    //                 Cart is Empty
    //             </h2>

    //         </div>
    //     )
    // }



    const handleRemoveCart = async (
        productId
    ) => {

        const result =
            await dispatch(
                removeCart(
                    productId
                )
            );

        dispatch(
            resetCoupon()
        );

        if (
            result.meta.requestStatus ===
            "fulfilled"
        ) {

            toast.success(
                "Product removed from cart"
            );
        }

        if (
            result.meta.requestStatus ===
            "rejected"
        ) {

            toast.error(
                "Failed to remove product"
            );
        }
    };




    // 

    const handleIncrease =
        async (productId) => {

            const result =
                await dispatch(
                    updateCart({
                        productId,
                        action:
                            "increase"
                    })
                );

            dispatch(
                resetCoupon()
            );

            if (
                result.meta.requestStatus ===
                "rejected"
            ) {

                toast.error(
                    "Unable to update quantity"
                );
            }
        };




    const handleDecrease =
        async (productId) => {

            const result =
                await dispatch(
                    updateCart({
                        productId,
                        action:
                            "decrease"
                    })
                );

            dispatch(
                resetCoupon()
            );

            if (
                result.meta.requestStatus ===
                "rejected"
            ) {

                toast.error(
                    "Unable to update quantity"
                );
            }
        };



    const handleApplyCoupon =
        async () => {

            const result =
                await dispatch(
                    applyCoupon({
                        couponCode
                    })
                );

            if (
                result.meta.requestStatus ===
                "fulfilled"
            ) {

                toast.success(
                    "Coupon applied successfully"
                );
            }

            if (
                result.meta.requestStatus ===
                "rejected"
            ) {

                toast.error(
                    result.payload ||
                    "Invalid coupon"
                );
            }
        };


    const totalItem = items.reduce((acc, item) => {
        return acc + item.quantity
    },
        0)


    const subTotal = items.reduce((acc, item) => {

        return acc + (
            item.quantity * item.product.price
        )
    },
        0)

    const shipping = subTotal >= 5000 ? 0 : 100

    const grandTotal =
        discount > 0
            ? finalAmount + shipping
            : subTotal + shipping;
    return (
        <>
            <div className="cart-page">

                <div className="container">

                    {/* HERO */}

                    <div className="cart-hero">

                        <p className="cart-subtitle">
                            PREMIUM CHECKOUT
                        </p>

                        <h1 className="cart-title">
                            Your Shopping Cart
                        </h1>

                        <p className="cart-description">
                            Review your curated luxury selections before proceeding to checkout.
                        </p>

                    </div>



                    {/* STATS */}

                    <div className="cart-stats">

                        <div className="cart-pill">

                            <span>
                                {totalItem}
                            </span>

                            <p>
                                ITEMS
                            </p>

                        </div>

                        <div className="cart-divider"></div>

                        <div className="cart-pill">

                            <span>
                                ₹{subTotal}
                            </span>

                            <p>
                                SUBTOTAL
                            </p>

                        </div>

                    </div>



                    {/* MAIN SECTION */}

                    <div className="cart-content">

                        {/* LEFT SIDE */}

                        <div className="cart-items">

                            {
                                items?.map((item) => (

                                    <div
                                        key={item.product._id}
                                        className="cart-item-card"
                                    >

                                        {/* IMAGE */}

                                        <div className="cart-item-image">

                                            <img
                                                src={
                                                    item.product.images?.[0]?.url
                                                }
                                                alt={
                                                    item.product.name
                                                }
                                                loading="lazy"
                                            />

                                        </div>



                                        {/* DETAILS */}

                                        <div className="cart-item-details">

                                            <p className="cart-brand">

                                                {
                                                    item.product.brand
                                                }

                                            </p>

                                            <h3 className="cart-item-name">

                                                {
                                                    item.product.name
                                                }

                                            </h3>

                                            <div className="cart-rating">

                                                ★★★★★
                                                <span>
                                                    (24)
                                                </span>

                                            </div>

                                            <div className="cart-price">

                                                ₹{
                                                    item.product.price
                                                }

                                            </div>

                                            <div className="cart-stock">

                                                ✓ In Stock

                                            </div>



                                            {/* QUANTITY */}

                                            <div className="cart-quantity-controls">

                                                <button
                                                    className="qty-btn"
                                                    disabled={
                                                        item.quantity <= 1
                                                    }
                                                    onClick={() =>
                                                        handleDecrease(
                                                            item.product._id
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span className="qty-value">

                                                    {
                                                        item.quantity
                                                    }

                                                </span>

                                                <button
                                                    className="qty-btn"
                                                    onClick={() =>
                                                        handleIncrease(
                                                            item.product._id
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>



                                            {/* REMOVE */}

                                            <button
                                                className="remove-btn"
                                                onClick={() =>
                                                    handleRemoveCart(
                                                        item.product._id
                                                    )
                                                }
                                            >
                                                Remove Item
                                            </button>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>



                        {/* RIGHT SIDE */}

                        <div className="cart-summary">

                            <h2>
                                Order Summary
                            </h2>



                            <div className="summary-row">

                                <span>
                                    Total Items
                                </span>

                                <span>
                                    {totalItem}
                                </span>

                            </div>



                            <div className="summary-row">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    ₹{subTotal}
                                </span>

                            </div>



                            <div className="summary-row">

                                <span>
                                    Shipping
                                </span>

                                <span>
                                    {
                                        shipping === 0
                                            ? "FREE"
                                            : `₹${shipping}`
                                    }
                                </span>

                            </div>



                            {/* COUPON */}

                            <div className="coupon-section">

                                <input
                                    type="text"
                                    value={couponCode}
                                    className="coupon-input"
                                    placeholder="Enter Coupon Code"
                                    onChange={(e) =>
                                        setCouponCode(
                                            e.target.value
                                        )
                                    }
                                />

                                <button
                                    className="apply-coupon-btn"
                                    disabled={couponLoading}
                                    onClick={
                                        handleApplyCoupon
                                    }
                                >
                                    {
                                        couponLoading
                                            ? "Applying..."
                                            : "Apply"
                                    }
                                </button>

                            </div>



                            {
                                discount > 0 && (

                                    <div className="summary-row">

                                        <span>
                                            Discount
                                        </span>

                                        <span>
                                            -₹{discount}
                                        </span>

                                    </div>

                                )
                            }



                            <div className="summary-row grand-total">

                                <span>
                                    Grand Total
                                </span>

                                <span>
                                    ₹{grandTotal}
                                </span>

                            </div>



                            {/* BENEFITS */}

                            <div className="cart-benefits">

                                <p>
                                    ✓ Free Luxury Shipping
                                </p>

                                <p>
                                    ✓ Secure Payments
                                </p>

                                <p>
                                    ✓ Easy Returns
                                </p>

                            </div>



                            <button
                                className="checkout-btn"
                                onClick={() =>
                                    navigate("/checkout")
                                }
                            >
                                Proceed To Checkout
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default CartPage