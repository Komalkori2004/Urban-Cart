import React from 'react'

import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { resetCoupon } from '../redux/feature/couponSlice'
import { getCart, updateCart, removeCart } from '../redux/thunks/cartThunks'
import { applyCoupon } from '../redux/thunks/couponThunk'
import { useEffect, useState } from 'react'


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
    if (error) {
        return <h2>{error}</h2>
    }
    if (items.length == 0) {
        return (
            <div>

                <h2>
                    Cart is Empty
                </h2>

            </div>
        )
    }


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
            <div className="container">

                <div className="cart-container">

                    <h1 className="cart-title">
                        My Cart
                    </h1>

                    <div className="cart-content">

                        <div className="cart-items">

                            {items?.map((item) => (

                                <div
                                    key={item.product._id}
                                    className="cart-item-card"
                                >

                                    <div className="cart-item-image">
                                        <img
                                            src={item.product.images[0]?.url}
                                            alt={item.product.name}
                                        />
                                    </div>

                                    <div className="cart-item-details">

                                        <h3 className="cart-item-name">
                                            {item.product.name}
                                        </h3>

                                        <p className="cart-item-price">
                                            ₹{item.product.price}
                                        </p>

                                        <div className="cart-quantity-controls">


                                            <button
                                                type="button"
                                                className="qty-btn"
                                                disabled={item.quantity <= 1}

                                                onClick={() => {
                                                    dispatch(
                                                        updateCart({
                                                            productId: item.product._id,
                                                            action: "decrease"
                                                        })
                                                    );

                                                    dispatch(resetCoupon());
                                                }}
                                            >
                                                -
                                            </button>



                                            <span className="qty-value">
                                                {item.quantity}
                                            </span>



                                            <button
                                                type="button"
                                                className="qty-btn"
                                                onClick={() => {
                                                    dispatch(
                                                        updateCart({
                                                            productId: item.product._id,
                                                            action: "increase"
                                                        })
                                                    );

                                                    dispatch(resetCoupon());
                                                }}

                                            >
                                                +
                                            </button>

                                        </div>

                                        <button

                                            type="button"
                                            className="remove-btn"

                                            onClick={() => {
                                                dispatch(
                                                    removeCart(item.product._id)
                                                );

                                                dispatch(resetCoupon());
                                            }}
                                        >

                                            Remove

                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>


                        <div className="cart-summary">

                            <h2>
                                Order Summary
                            </h2>

                            <div className="summary-row">
                                <span>Total Items</span>
                                <span>{totalItem}</span>
                            </div>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{subTotal}</span>
                            </div>

                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>₹{shipping}</span>
                            </div>
                            <div className="coupon-section">

                                <input
                                    type="text"
                                    placeholder="Enter Coupon Code"
                                    className="coupon-input"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className="apply-coupon-btn"
                                    disabled={couponLoading}
                                    onClick={() =>
                                        dispatch(
                                            applyCoupon({
                                                couponCode
                                            })
                                        )
                                    }
                                >
                                    {couponLoading ? "Applying..." : "Apply"}
                                </button>

                            </div>
                            {discount > 0 && (
                                <div className="summary-row">
                                    <span>Discount</span>
                                    <span>-₹{discount}</span>
                                </div>
                            )}
                            <div className="summary-row grand-total">
                                <span>Grand Total</span>
                                <span>₹{grandTotal}</span>
                            </div>

                            <button
                                className="checkout-btn"
                                onClick={() => navigate("/checkout")}

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