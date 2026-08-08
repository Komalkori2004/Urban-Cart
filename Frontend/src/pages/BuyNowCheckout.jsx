import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
    buyNowOrder,
    createRozerpayOrder,
    verifyPayment
} from "../redux/thunks/orderThunks";

import "../style/checkOut.css"

const BuyNowCheckout = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const {
        buyNowLoading,
        buyNowError
    } = useSelector(
        (state) => state.order
    );

    const product = location.state?.product;
    const quantity = location.state?.quantity || 1;

    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        city: "",
        state: "",
        pincode: ""
    });

    useEffect(() => {

        if (!product) {

            toast.error(
                "No product selected for Buy Now"
            );

            navigate("/products", {
                replace: true
            });
        }

    }, [product, navigate]);


    if (!product) {
        return null;
    }


    const productTotal =
        product.price * quantity;


    const shippingCharge =
        productTotal >= 5000
            ? 0
            : 100;


    const totalAmount =
        productTotal + shippingCharge;


    const handleChange = (e) => {

        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !shippingAddress.fullName ||
            !shippingAddress.phone ||
            !shippingAddress.city ||
            !shippingAddress.state ||
            !shippingAddress.pincode
        ) {
            toast.error(
                "Please enter complete shipping address"
            );

            return;
        }


        // =========================
        // COD
        // =========================

        if (paymentMethod === "COD") {

            const orderData = {

                productId: product._id,

                quantity,

                shippingAddress,

                paymentMethod: "COD"

            };


            const result =
                await dispatch(
                    buyNowOrder(orderData)
                );


            if (
                buyNowOrder.fulfilled.match(result)
            ) {

                toast.success(
                    "Order placed successfully"
                );

                navigate("/orders");

            } else {

                toast.error(
                    result.payload ||
                    "Failed to place order"
                );
            }

            return;
        }


        // =========================
        // RAZORPAY
        // =========================

        if (paymentMethod === "RAZORPAY") {

            const paymentResult =
                await dispatch(
                    createRozerpayOrder(
                        totalAmount
                    )
                );


            if (
                !createRozerpayOrder.fulfilled.match(
                    paymentResult
                )
            ) {

                toast.error(
                    "Failed to create Razorpay order"
                );

                return;
            }


            const razorpayOrder =
                paymentResult.payload;


            const options = {

                key:
                    import.meta.env
                        .VITE_RAZORPAY_KEY_ID,

                amount:
                    razorpayOrder.amount,

                currency:
                    razorpayOrder.currency,

                order_id:
                    razorpayOrder.id,

                name:
                    "UrbanCart",

                description:
                    product.name,


                handler:
                    async function (response) {

                        // 1. Verify payment

                        const verifyResult =
                            await dispatch(
                                verifyPayment({

                                    razorpay_payment_id:
                                        response.razorpay_payment_id,

                                    razorpay_order_id:
                                        response.razorpay_order_id,

                                    razorpay_signature:
                                        response.razorpay_signature

                                })
                            );


                        if (
                            !verifyPayment.fulfilled.match(
                                verifyResult
                            )
                        ) {

                            toast.error(
                                "Payment verification failed"
                            );

                            return;
                        }


                        // 2. Payment verified
                        // Now create Buy Now order

                        const orderData = {

                            productId:
                                product._id,

                            quantity,

                            shippingAddress,

                            paymentMethod:
                                "RAZORPAY",

                            razorpayPaymentId:
                                response.razorpay_payment_id,

                            razorpayOrderId:
                                response.razorpay_order_id

                        };


                        const orderResult =
                            await dispatch(
                                buyNowOrder(
                                    orderData
                                )
                            );


                        if (
                            buyNowOrder.fulfilled.match(
                                orderResult
                            )
                        ) {

                            toast.success(
                                "Payment successful. Order placed!"
                            );

                            navigate("/dashboard/orders");

                        } else {

                            toast.error(
                                orderResult.payload ||
                                "Payment successful but order creation failed"
                            );

                        }

                    },


                modal: {

                    ondismiss: function () {

                        toast.error(
                            "Payment cancelled"
                        );

                    }

                }

            };


            const razorpay =
                new window.Razorpay(
                    options
                );

            razorpay.open();
        }
    };


    return (

        <div className="checkout-page">

            <div className="container">

                <h1>
                    Buy Now Checkout
                </h1>


                <div className="checkout-layout">


                    {/* LEFT SIDE */}

                    <div className="checkout-left">

                        <div className="checkout-section">

                            <h2>
                                Shipping Address
                            </h2>


                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >

                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={
                                        shippingAddress.fullName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />


                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={
                                        shippingAddress.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />


                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={
                                        shippingAddress.city
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />


                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={
                                        shippingAddress.state
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />


                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Pincode"
                                    value={
                                        shippingAddress.pincode
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                                <div className="payment-method-section">

                                    <h2>Payment Method</h2>

                                    <label>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="COD"
                                            checked={paymentMethod === "COD"}
                                            onChange={(e) =>
                                                setPaymentMethod(e.target.value)
                                            }
                                        />
                                        Cash on Delivery
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="RAZORPAY"
                                            checked={paymentMethod === "RAZORPAY"}
                                            onChange={(e) =>
                                                setPaymentMethod(e.target.value)
                                            }
                                        />
                                        Razorpay
                                    </label>

                                </div>


                                <button
                                    type="submit"
                                    disabled={
                                        buyNowLoading
                                    }
                                >
                                    {
                                        buyNowLoading
                                            ? "Processing..."
                                            : "Place Order"
                                    }
                                </button>

                            </form>

                        </div>

                    </div>


                    {/* RIGHT SIDE */}

                    <div className="checkout-right">

                        <div className="order-summary">

                            <h2>
                                Order Summary
                            </h2>


                            <div className="checkout-product">

                                <img
                                    src={
                                        product.images?.[0]?.url
                                    }
                                    alt={
                                        product.name
                                    }
                                />


                                <div>

                                    <h3>
                                        {product.name}
                                    </h3>

                                    <p>
                                        ₹{product.price}
                                    </p>

                                    <p>
                                        Quantity: {
                                            quantity
                                        }
                                    </p>

                                </div>

                            </div>


                            <div className="summary-row">

                                <span>
                                    Product
                                </span>

                                <span>
                                    ₹{productTotal}
                                </span>

                            </div>


                            <div className="summary-row">

                                <span>
                                    Shipping
                                </span>

                                <span>
                                    {
                                        shippingCharge === 0
                                            ? "FREE"
                                            : `₹${shippingCharge}`
                                    }
                                </span>

                            </div>


                            <div className="summary-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹{totalAmount}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default BuyNowCheckout;