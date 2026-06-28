import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    createMembershipPlan
} from "../redux/thunks/membershipThunk";



import "./style/admin.css"

import "../Auth/auth.css"
function CreateMembership() {

    const dispatch = useDispatch();

    const {
        createLoading,
        createError,
        createSuccess
    } = useSelector(
        state => state.membership
    );

    const [formData, setFormData] = useState({

        name: "",

        description: "",

        price: "",

        durationInDays: "",

        features: "",

        discountPercentage: "",

        freeShipping: false,

        prioritySupport: false,

        earlyAccess: false,

        premiumBadge: "",

        maxDiscountAmount: "",

        isPopular: false,

        isRecommended: false,

        isActive: true
    });
    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value
        });
    };
    const handleSubmit =
        async (e) => {

            e.preventDefault();

            const payload = {

                ...formData,

                price:
                    Number(formData.price),

                durationInDays:
                    Number(formData.durationInDays),

                discountPercentage:
                    Number(formData.discountPercentage),

                maxDiscountAmount:
                    Number(formData.maxDiscountAmount),

                features:
                    formData.features
                        .split(",")
                        .map(item => item.trim())
            };

            console.log(payload);

            await dispatch(
                createMembershipPlan(
                    payload
                )
            );
        };

 return (

    <div className="auth-container">

        <div className="auth-box">

            <h1 className="auth-title">
                Create Membership
            </h1>

            <p className="auth-subtitle">
                Create a new premium membership plan
                for UrbanCart customers.
            </p>

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <input
                    className="auth-input"
                    type="text"
                    name="name"
                    placeholder="Membership Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <textarea
                    className="auth-input"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    className="auth-input"
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                />

                <input
                    className="auth-input"
                    type="number"
                    name="durationInDays"
                    placeholder="Duration In Days"
                    value={formData.durationInDays}
                    onChange={handleChange}
                />

                <textarea
                    className="auth-input"
                    name="features"
                    placeholder="Free Shipping, Priority Support"
                    value={formData.features}
                    onChange={handleChange}
                />

                <input
                    className="auth-input"
                    type="number"
                    name="discountPercentage"
                    placeholder="Discount Percentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                />

                <input
                    className="auth-input"
                    type="text"
                    name="premiumBadge"
                    placeholder="Premium Badge"
                    value={formData.premiumBadge}
                    onChange={handleChange}
                />

                <input
                    className="auth-input"
                    type="number"
                    name="maxDiscountAmount"
                    placeholder="Max Discount Amount"
                    value={formData.maxDiscountAmount}
                    onChange={handleChange}
                />

                <div className="membership-checkbox-group">

                    <label className="membership-check">
                        <input
                            type="checkbox"
                            name="freeShipping"
                            checked={formData.freeShipping}
                            onChange={handleChange}
                        />
                        Free Shipping
                    </label>

                    <label className="membership-check">
                        <input
                            type="checkbox"
                            name="prioritySupport"
                            checked={formData.prioritySupport}
                            onChange={handleChange}
                        />
                        Priority Support
                    </label>

                    <label className="membership-check">
                        <input
                            type="checkbox"
                            name="earlyAccess"
                            checked={formData.earlyAccess}
                            onChange={handleChange}
                        />
                        Early Access
                    </label>

                    <label className="membership-check">
                        <input
                            type="checkbox"
                            name="isPopular"
                            checked={formData.isPopular}
                            onChange={handleChange}
                        />
                        Popular
                    </label>

                    <label className="membership-check">
                        <input
                            type="checkbox"
                            name="isRecommended"
                            checked={formData.isRecommended}
                            onChange={handleChange}
                        />
                        Recommended
                    </label>

                    <label className="membership-check">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                        />
                        Active
                    </label>

                </div>

                <button
                    className="auth-btn"
                    type="submit"
                >
                    {
                        createLoading
                            ? "Creating..."
                            : "Create Membership"
                    }
                </button>

            </form>

            {
                createSuccess &&
                <p className="auth-success">
                    Membership created successfully
                </p>
            }

            {
                createError &&
                <p className="auth-error">
                    {createError}
                </p>
            }

        </div>

    </div>
);
}

export default CreateMembership;