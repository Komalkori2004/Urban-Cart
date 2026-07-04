import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../redux/thunks/authThunks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "./style/addAddress.css"

const AddAddressPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
    });

    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value,
        });
    };
    

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (address.fullName.trim().length < 3) {
        return toast.error(
            "Full name must be at least 3 characters"
        );
    }

    if (!/^[6-9]\d{9}$/.test(address.phone)) {
        return toast.error(
            "Enter a valid 10 digit phone number"
        );
    }

    if (address.addressLine1.trim().length < 10) {
        return toast.error(
            "Address should be at least 10 characters"
        );
    }

    if (!/^[A-Za-z ]+$/.test(address.city)) {
        return toast.error(
            "Enter a valid city"
        );
    }

    if (!/^[A-Za-z ]+$/.test(address.state)) {
        return toast.error(
            "Enter a valid state"
        );
    }

    if (!/^\d{6}$/.test(address.pincode)) {
        return toast.error(
            "Enter a valid 6 digit pincode"
        );
    }

    const result = await dispatch(
        addAddress(address)
    );

    if (addAddress.fulfilled.match(result)) {

        toast.success(
            "Address added successfully"
        );

        navigate("/checkout");
    }

    if (addAddress.rejected.match(result)) {

        toast.error(
            result.payload?.message ||
            "Failed to add address"
        );
    }
};

  return (

    <div className="container">

        <div className="address-page">

            {/* HEADER */}

            <div className="address-header">

                <span className="address-badge">
                    SHIPPING DETAILS
                </span>

                <h1 className="address-title">
                    Add New Address
                </h1>

                <p className="address-subtitle">
                    Save your delivery address securely for faster checkout.
                </p>

            </div>


            {/* CARD */}

            <div className="address-card">

                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >

                    {/* ROW 1 */}

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={address.fullName}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={address.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        maxLength={10}
                        required
                    />


                    {/* ADDRESS */}

                    <input
                        type="text"
                        name="addressLine1"
                        placeholder="House No, Street, Area"
                        className="full-width"
                        value={address.addressLine1}
                        onChange={handleChange}
                        autoComplete="address-line1"
                        required
                    />

                    <input
                        type="text"
                        name="addressLine2"
                        placeholder="Landmark (Optional)"
                        className="full-width"
                        value={address.addressLine2}
                        onChange={handleChange}
                        autoComplete="address-line2"
                    />


                    {/* CITY STATE */}

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={address.city}
                        onChange={handleChange}
                        autoComplete="address-level2"
                        required
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={address.state}
                        onChange={handleChange}
                        autoComplete="address-level1"
                        required
                    />


                    {/* PINCODE COUNTRY */}

                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={address.pincode}
                        onChange={handleChange}
                        autoComplete="postal-code"
                        maxLength={6}
                        required
                    />

                    <input
                        type="text"
                        name="country"
                        value={address.country}
                        readOnly
                    />


                    {/* BUTTON */}

                    <button
                        className="place-order-btn"
                        type="submit"
                    >
                        Save Address
                    </button>

                </form>

            </div>

        </div>

    </div>
);
};

export default AddAddressPage;