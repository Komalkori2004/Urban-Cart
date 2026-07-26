import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    createMembershipPlan
} from "../redux/thunks/membershipThunk";
import { toast } from "sonner";

import "./style/createMemberShip.css"

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
    const handleSubmit = async (e) => {

        e.preventDefault();

        const payload = {

            ...formData,

            price: Number(formData.price),

            durationInDays: Number(formData.durationInDays),

            discountPercentage: Number(formData.discountPercentage),

            maxDiscountAmount: Number(formData.maxDiscountAmount),

            features: formData.features
                .split(",")
                .map(item => item.trim())

        };

        const result = await dispatch(
            createMembershipPlan(payload)
        );

        if (createMembershipPlan.fulfilled.match(result)) {

            toast.success("Membership created successfully!");

            setFormData({
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

        } else {

            toast.error(
                result.payload || "Failed to create membership."
            );

        }

    };
    return (

        <div className="admin-create-membership-page">

            <div className="admin-create-header">

                <span className="admin-create-tag">
                    👑 UrbanCart Admin
                </span>

                <h1>
                    Create Membership Plan
                </h1>

                <p>
                    Create premium membership plans for your customers with pricing,
                    discounts, exclusive benefits and premium access.
                </p>

            </div>

            <div className="admin-create-card">

                <form
                    className="admin-create-form"
                    onSubmit={handleSubmit}
                >

                    <div className="admin-form-section">

                        <h2>
                            Basic Information
                        </h2>

                        <div className="admin-form-grid">

                            <input
                                className="admin-input"
                                type="text"
                                name="name"
                                placeholder="Membership Name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <input
                                className="admin-input"
                                type="text"
                                name="premiumBadge"
                                placeholder="Premium Badge"
                                value={formData.premiumBadge}
                                onChange={handleChange}
                            />

                        </div>

                        <textarea
                            className="admin-input admin-textarea"
                            name="description"
                            placeholder="Membership Description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="admin-form-section">

                        <h2>
                            Pricing Details
                        </h2>

                        <div className="admin-form-grid">

                            <input
                                className="admin-input"
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                            />

                            <input
                                className="admin-input"
                                type="number"
                                name="durationInDays"
                                placeholder="Duration (Days)"
                                value={formData.durationInDays}
                                onChange={handleChange}
                            />

                            <input
                                className="admin-input"
                                type="number"
                                name="discountPercentage"
                                placeholder="Discount %"
                                value={formData.discountPercentage}
                                onChange={handleChange}
                            />

                            <input
                                className="admin-input"
                                type="number"
                                name="maxDiscountAmount"
                                placeholder="Max Discount Amount"
                                value={formData.maxDiscountAmount}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    <div className="admin-form-section">

                        <h2>
                            Membership Features
                        </h2>

                        <textarea
                            className="admin-input admin-textarea"
                            name="features"
                            placeholder="Free Shipping, Priority Support, Early Access..."
                            value={formData.features}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="admin-form-section">

                        <h2>
                            Membership Settings
                        </h2>

                        <div className="admin-checkbox-grid">

                            <label className="admin-check">
                                <input
                                    type="checkbox"
                                    name="freeShipping"
                                    checked={formData.freeShipping}
                                    onChange={handleChange}
                                />
                                Free Shipping
                            </label>

                            <label className="admin-check">
                                <input
                                    type="checkbox"
                                    name="prioritySupport"
                                    checked={formData.prioritySupport}
                                    onChange={handleChange}
                                />
                                Priority Support
                            </label>

                            <label className="admin-check">
                                <input
                                    type="checkbox"
                                    name="earlyAccess"
                                    checked={formData.earlyAccess}
                                    onChange={handleChange}
                                />
                                Early Access
                            </label>

                            <label className="admin-check">
                                <input
                                    type="checkbox"
                                    name="isPopular"
                                    checked={formData.isPopular}
                                    onChange={handleChange}
                                />
                                Popular Plan
                            </label>

                            <label className="admin-check">
                                <input
                                    type="checkbox"
                                    name="isRecommended"
                                    checked={formData.isRecommended}
                                    onChange={handleChange}
                                />
                                Recommended
                            </label>

                            <label className="admin-check">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                />
                                Active Plan
                            </label>

                        </div>

                    </div>

                    <button
                        className="admin-submit-btn"
                        type="submit"
                        disabled={createLoading}
                    >
                        {
                            createLoading
                                ? "Creating..."
                                : "Create Membership"
                        }
                    </button>


                </form>

            </div>

        </div>

    );
}

export default CreateMembership;