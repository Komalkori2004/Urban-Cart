import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import { placeOrder } from "../redux/thunks/orderThunks";

import {useNavigate} from "react-router-dom"

const CheckoutPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    const handleSubmit =  async(e) => {
        e.preventDefault()
        const orderData = {
            shippingAddress,
            paymentMethod
        }

        const resultAction =
            await dispatch(
                placeOrder(orderData)
            );
        if (placeOrder.fulfilled.match(resultAction)) {
            navigate("/my-orders")
        }


    }

    return (<>

        <div className="checkout-container">

            <h1 className="checkout-title">
                Checkout
            </h1>

            <div className="checkout-form">

                <input
                    type="text"
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
                />

                <input
                    type="text"
                    placeholder="Address Line 1"
                    name="addressLine1"
                    onChange={handleChange}
                    value={shippingAddress.addressLine1}
                />

                <input
                    type="text"
                    placeholder="Address Line 2"
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
                />

                <input
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={handleChange}
                    value={shippingAddress.state}
                />

                <input
                    type="text"
                    placeholder="Pincode"
                    name="pincode"
                    onChange={handleChange}
                    value={shippingAddress.pincode}
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

                    <h3>
                        Payment Method
                    </h3>

                    <label>

                        <input
                            type="radio"
                            value="COD"
                            checked={
                                paymentMethod === "COD"
                            }
                            readOnly
                        />

                        Cash On Delivery

                    </label>

                </div>

                <button
                    className="place-order-btn"
                    onClick={handleSubmit}
                >
                    Place Order
                </button>

            </div>

        </div>
    </>)
}

export default CheckoutPage
