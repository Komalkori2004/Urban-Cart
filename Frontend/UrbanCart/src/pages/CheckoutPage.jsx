import React, { useState, useEffect } from "react";

import "../style/checkOut.css"
import { useDispatch, useSelector } from "react-redux"

import { placeOrder, createRozerpayOrder, verifyPayment } from "../redux/thunks/orderThunks";
import { getAddresses, addAddress } from '../redux/thunks/authThunks'

import { useNavigate } from "react-router-dom"
import { toast }
    from "sonner";



const CheckoutPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectAddress, setSelectAddress] = useState(null)

    const { user, loading, error, addresses } = useSelector(state => state.auth)
    const {
        couponCode,
        discount,
        finalAmount
    } = useSelector(
        (state) => state.coupon
    );
    const { items } = useSelector(state => state.cart)
    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
    })
    const [paymentMethod, setPaymentMethod] = useState("COD")




    const handleChange = (e) => {

        setShippingAddress({
            ...shippingAddress, [e.target.name]: e.target.value
        })
    }

    const cartTotal = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
 const shipping =
    cartTotal >= 5000 ? 0 : 100;

const payableAmount =
    discount > 0
        ? finalAmount + shipping
        : cartTotal + shipping;




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (paymentMethod === "COD") {

            const result = await dispatch(
                placeOrder({
                    shippingAddress:
                        selectAddress || shippingAddress,
                    paymentMethod: "COD",
                    couponCode
                })
            );

            if (placeOrder.fulfilled.match(result)) {
                toast.success("Order placed successfully");
                navigate("/dashboard/orders");
            }

            if (placeOrder.rejected.match(result)) {
                toast.error(result.payload?.message);
            }

            return;
        }

        const resultAction =
            await dispatch(
                createRozerpayOrder(payableAmount)
            );

        if (
            !createRozerpayOrder.fulfilled.match(
                resultAction
            )
        ) {
            return;
        }

        const order = resultAction.payload;

        const options = {
            key:
                import.meta.env.VITE_RAZORPAY_KEY_ID,

            amount: order.amount,

            currency: order.currency,

            order_id: order.id,

            name: "UrbanCart",

            handler: async function (response) {

                const verifyResult = await dispatch(
                    verifyPayment({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    })
                );

                if (verifyPayment.rejected.match(verifyResult)) {
                    toast.error("Payment verification failed");
                    return;
                }

                const orderResult = await dispatch(
                    placeOrder({
                        shippingAddress:
                            selectAddress || shippingAddress,
                        paymentMethod: "RAZORPAY",
                        couponCode
                    })
                );

                if (placeOrder.fulfilled.match(orderResult)) {
                    toast.success("Order placed successfully");
                    navigate("/dashboard/orders");
                }

                if (placeOrder.rejected.match(orderResult)) {
                    toast.error(orderResult.payload?.message);
                }
            }
        };

        const razorpay =
            new window.Razorpay(options);

        razorpay.open();
    };


    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch]);

    useEffect(() => {
        if (addresses?.length > 0) {
            const defaultAddress =
                addresses.find(addr => addr.isDefault);

            setSelectAddress(
                defaultAddress || addresses[0]
            );
        }
    }, [addresses]);

    // const shipping =
    // cartTotal >= 5000 ? 0 : 100;
    

    return (
        <div className="checkout-container">

            <h1 className="checkout-title">
                Checkout
            </h1>

            {/* Address Section */}

            <section className="checkout-section">

                <div className="section-header">
                    <h2>Delivery Address</h2>

                    <button
                        type="button"
                        className="add-address-btn"
                        onClick={() => navigate("/add-address")}
                    >
                        + Add New Address
                    </button>
                </div>

                <div className="saved-addresses">

                    {addresses?.map((address) => (

                        <div
                            key={address._id}
                            className={`address-card ${selectAddress?._id === address._id
                                ? "selected"
                                : ""
                                }`}
                            onClick={() =>
                                setSelectAddress(address)
                            }
                        >

                            <h4>{address.fullName}</h4>

                            <p>{address.phone}</p>

                            <p>{address.addressLine1}</p>

                            <p>
                                {address.city}, {address.state}
                            </p>

                            <p>{address.pincode}</p>

                            {address.isDefault && (
                                <span className="default-badge">
                                    Default Address
                                </span>
                            )}

                        </div>

                    ))}

                </div>

            </section>

            {/* Checkout Layout */}

            <div className="checkout-layout">

                {/* Left Side */}

                <div className="checkout-left">

                    <div className="payment-section">

                        <h3>Payment Method</h3>

                        <label className="payment-option">

                            <input
                                type="radio"
                                value="COD"
                                checked={paymentMethod === "COD"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />

                            <span>Cash On Delivery</span>

                        </label>

                        <label className="payment-option">

                            <input
                                type="radio"
                                value="RAZORPAY"
                                checked={paymentMethod === "RAZORPAY"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />

                            <span>
                                Pay Online (Razorpay)
                            </span>

                        </label>

                    </div>

                </div>

                {/* Right Side */}

                <div className="checkout-right">

                    <div className="order-summary">

                        <h3>Order Summary</h3>

                        <p>
                            <span>Items</span>

                            <span>{items.length}</span>
                        </p>

                        <p>
                            <span>Subtotal</span>
                            <span>₹{cartTotal}</span>
                        </p>
<p>
    <span>Shipping</span>

    <span>
        {shipping === 0
            ? "Free"
            : `₹${shipping}`}
    </span>
</p>


                        {/* <p className="total-row">

                            <strong>Total</strong>

                            <strong>
                                ₹{totalAmount}
                            </strong>

                        </p> */}
                        {discount > 0 && (
                            <p>
                                <span>Discount</span>
                                <span>-₹{discount}</span>
                            </p>
                        )}
                        {couponCode && (
                            <p className="coupon-applied">
                                Coupon Applied: {couponCode}
                            </p>
                        )}
                        <hr />
                        <p className="total-row">
                            <strong>Total</strong>

                            <strong>
                                ₹{payableAmount}
                            </strong>
                        </p>

                        <button
                            className="place-order-btn"
                            onClick={handleSubmit}
                        >
                            Place Order
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CheckoutPage
