import React, { useState } from "react";

import "../style/checkOut.css"
import { useDispatch, useSelector } from "react-redux"

import { placeOrder, createRozerpayOrder, verifyPayment } from "../redux/thunks/orderThunks";

import { useNavigate } from "react-router-dom"
import { toast }
    from "sonner";


const CheckoutPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    const totalAmount = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);




    const handleSubmit = async (e) => {
        e.preventDefault();

        const resultAction =
            await dispatch(
                createRozerpayOrder(totalAmount)
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

                if (verifyPayment.fulfilled.match(verifyResult)) {

                    const orderResult = await dispatch(
                        placeOrder({
                            shippingAddress,
                            paymentMethod: "RAZORPAY",
                        })
                    );

                    if (placeOrder.fulfilled.match(orderResult)) {
                        toast.success("Order placed successfully");
                        navigate("/my-orders");
                    }
                    if (placeOrder.rejected.match(orderResult)) {

                        toast.error(orderResult.payload?.message);
                    }

                }
            }
        };

        const razorpay =
            new window.Razorpay(options);

        razorpay.open();
    };



    console.log(
        "token",
        localStorage.getItem("token")
    );
    return (<>

        <div className="checkout-container">

            <h1 className="checkout-title">
                Checkout
            </h1>

            <form
                className="checkout-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    required
                    placeholder="Full Name"
                    name="fullName"
                    onChange={handleChange}
                    value={shippingAddress.fullName}
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    value={shippingAddress.phone}
                    required
                />

                <input
                    type="text"
                    placeholder="Address Line 1"
                    name="addressLine1"
                    className="full-width"
                    onChange={handleChange}
                    value={shippingAddress.addressLine1}
                    required
                />

                <input
                    type="text"
                    placeholder="Address Line 2"
                    className="full-width"
                    name="addressLine2"
                    onChange={handleChange}
                    value={shippingAddress.addressLine2}
                />

                <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={handleChange}
                    value={shippingAddress.city}
                    required
                />

                <input
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={handleChange}
                    value={shippingAddress.state}
                    required
                />

                <input
                    type="text"
                    placeholder="Pincode"
                    name="pincode"
                    onChange={handleChange}
                    value={shippingAddress.pincode}
                    required
                />


                <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleChange}
                    readOnly
                />
                <div className="payment-section">

                    <h3>Payment Method</h3>

                    <label className="payment-option">

                        <input
                            type="radio"
                            value="COD"
                            checked={paymentMethod === "COD"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />

                        <span>Cash On Delivery</span>

                    </label>
                    <label className="payment-option disabled">

                        <input
                            type="radio"
                            value="ONLINE"
                            disabled
                        />

                        <span>Online Payment (Coming Soon)</span>

                    </label>
                </div>

                <button
                    className="place-order-btn"
                    type="submit"

                >
                    Place Order
                </button>

            </form>

        </div >
    </>)
}

export default CheckoutPage
