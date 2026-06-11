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

        const result = await dispatch(
            addAddress(address)
        );

        if (addAddress.fulfilled.match(result)) {
            toast.success("Address added successfully");
            navigate("/checkout");
        }

        if (addAddress.rejected.match(result)) {
            toast.error(result.payload?.message);
        }
    };

    return (

        <div className="container">
            <div className="address-page">

                <h1>Add New Address</h1>



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
                        value={address.fullName}
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        name="phone"
                        onChange={handleChange}
                        value={address.phone}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Address Line 1"
                        name="addressLine1"
                        className="full-width"
                        onChange={handleChange}
                        value={address.addressLine1}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Address Line 2"
                        className="full-width"
                        name="addressLine2"
                        onChange={handleChange}
                        value={address.addressLine2}
                    />

                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        onChange={handleChange}
                        value={address.city}
                        required
                    />

                    <input
                        type="text"
                        placeholder="State"
                        name="state"
                        onChange={handleChange}
                        value={address.state}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Pincode"
                        name="pincode"
                        onChange={handleChange}
                        value={address.pincode}
                        required
                    />


                    <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        value={address.country}
                        onChange={handleChange}
                        readOnly
                    />


                    <button
                        className="place-order-btn"
                        type="submit"

                    >
                        Save Address
                    </button>

                </form>



            </div>
        </div>
    );
};

export default AddAddressPage;