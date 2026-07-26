import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./style/editmembership.css"
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { useLocation } from "react-router-dom";
import { updateMembershipPlan, deleteMembershipPlan }

    from "../redux/thunks/membershipThunk";

function EditMembership() {

    const dispatch =
        useDispatch();
        const navigate = useNavigate();

    const location = useLocation();

    const {
        updateLoading,
        updateSuccess,
        updateError,
        deleteLoading,
        deleteSuccess,
        deleteError
    } = useSelector(
        state => state.membership
    );

    const { id } = useParams();

    console.log(id);
    const [formData, setFormData] =
        useState({

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

        const result = await dispatch(
            updateMembershipPlan({
                id,
                membershipData: {
                    name: formData.name,
                    description: formData.description,
                    price: Number(formData.price),
                    durationInDays: Number(formData.durationInDays),
                    features: formData.features
                        .split(",")
                        .map(item => item.trim()),
                    discountPercentage: Number(formData.discountPercentage),
                    maxDiscountAmount: Number(formData.maxDiscountAmount),
                    premiumBadge: formData.premiumBadge,
                    freeShipping: formData.freeShipping,
                    prioritySupport: formData.prioritySupport,
                    earlyAccess: formData.earlyAccess,
                    isPopular: formData.isPopular,
                    isRecommended: formData.isRecommended,
                    isActive: formData.isActive
                }
            })
        );

        if (updateMembershipPlan.fulfilled.match(result)) {

            toast.success("Membership updated successfully!");

        } else {

            toast.error(
                result.payload || "Failed to update membership."
            );

        }

    };



const handleDelete = () => {

    toast(
        "Delete Membership?",
        {
            description:
                "This action cannot be undone.",

            action: {

                label: "Delete",

                onClick: async () => {

                    const result =
                        await dispatch(
                            deleteMembershipPlan(id)
                        );

                    if (
                        deleteMembershipPlan.fulfilled.match(result)
                    ) {

                        toast.success(
                            "Membership deleted successfully!"
                        );

                        navigate(
                            "/admin/membership-management"
                        );

                    } else {

                        toast.error(
                            result.payload ||
                            "Failed to delete membership."
                        );

                    }

                }

            },

            cancel: {

                label: "Cancel"

            }

        }
    );

};



    useEffect(() => {

        if (location.state?.plan) {

            const plan =
                location.state.plan;

            setFormData({
                name: plan.name,
                description: plan.description,
                price: plan.price,
                durationInDays: plan.durationInDays,
                features: plan.features?.join(", "),
                discountPercentage: plan.discountPercentage,
                freeShipping: plan.freeShipping,
                prioritySupport: plan.prioritySupport,
                earlyAccess: plan.earlyAccess,
                premiumBadge: plan.premiumBadge,
                maxDiscountAmount: plan.maxDiscountAmount,
                isPopular: plan.isPopular,
                isRecommended: plan.isRecommended,
                isActive: plan.isActive
            });
        }

    }, [location]);
   



    return (

    <div className="admin-edit-membership-page">

        <div className="admin-edit-header">

            <span className="admin-edit-tag">
                👑 UrbanCart Admin
            </span>

            <h1>
                Edit Membership Plan
            </h1>

            <p>
                Update your premium membership plan, pricing, benefits and
                membership settings from one place.
            </p>

        </div>

        <div className="admin-edit-card">

            <form
                className="admin-edit-form"
                onSubmit={handleSubmit}
            >

                {/* =========================
                    BASIC INFORMATION
                ========================== */}

                <div className="admin-edit-section">

                    <h2>
                        Basic Information
                    </h2>

                    <div className="admin-edit-grid">

                        <input
                            className="admin-edit-input"
                            type="text"
                            name="name"
                            placeholder="Membership Name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <input
                            className="admin-edit-input"
                            type="text"
                            name="premiumBadge"
                            placeholder="Premium Badge"
                            value={formData.premiumBadge}
                            onChange={handleChange}
                        />

                    </div>

                    <textarea
                        className="admin-edit-input admin-edit-textarea"
                        name="description"
                        placeholder="Membership Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                </div>


                {/* =========================
                    PRICING DETAILS
                ========================== */}

                <div className="admin-edit-section">

                    <h2>
                        Pricing Details
                    </h2>

                    <div className="admin-edit-grid">

                        <input
                            className="admin-edit-input"
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                        />

                        <input
                            className="admin-edit-input"
                            type="number"
                            name="durationInDays"
                            placeholder="Duration (Days)"
                            value={formData.durationInDays}
                            onChange={handleChange}
                        />

                        <input
                            className="admin-edit-input"
                            type="number"
                            name="discountPercentage"
                            placeholder="Discount Percentage"
                            value={formData.discountPercentage}
                            onChange={handleChange}
                        />

                        <input
                            className="admin-edit-input"
                            type="number"
                            name="maxDiscountAmount"
                            placeholder="Max Discount Amount"
                            value={formData.maxDiscountAmount}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                                {/* =========================
                    MEMBERSHIP FEATURES
                ========================== */}

                <div className="admin-edit-section">

                    <h2>
                        Membership Features
                    </h2>

                    <textarea
                        className="admin-edit-input admin-edit-textarea"
                        name="features"
                        placeholder="Free Shipping, Priority Support, Early Access..."
                        value={formData.features}
                        onChange={handleChange}
                    />

                </div>


                {/* =========================
                    MEMBERSHIP SETTINGS
                ========================== */}

                <div className="admin-edit-section">

                    <h2>
                        Membership Settings
                    </h2>

                    <div className="admin-edit-checkbox-grid">

                        <label className="admin-edit-check">

                            <input
                                type="checkbox"
                                name="freeShipping"
                                checked={formData.freeShipping}
                                onChange={handleChange}
                            />

                            Free Shipping

                        </label>

                        <label className="admin-edit-check">

                            <input
                                type="checkbox"
                                name="prioritySupport"
                                checked={formData.prioritySupport}
                                onChange={handleChange}
                            />

                            Priority Support

                        </label>

                        <label className="admin-edit-check">

                            <input
                                type="checkbox"
                                name="earlyAccess"
                                checked={formData.earlyAccess}
                                onChange={handleChange}
                            />

                            Early Access

                        </label>

                        <label className="admin-edit-check">

                            <input
                                type="checkbox"
                                name="isPopular"
                                checked={formData.isPopular}
                                onChange={handleChange}
                            />

                            Popular Plan

                        </label>

                        <label className="admin-edit-check">

                            <input
                                type="checkbox"
                                name="isRecommended"
                                checked={formData.isRecommended}
                                onChange={handleChange}
                            />

                            Recommended

                        </label>

                        <label className="admin-edit-check">

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


                <div className="admin-edit-action-buttons">

                    <button
                        className="admin-update-btn"
                        type="submit"
                        disabled={updateLoading}
                    >

                        {
                            updateLoading
                                ? "Updating..."
                                : "Update Membership"
                        }

                    </button>

                    <button
                        className="admin-delete-btn"
                        type="button"
                        disabled={deleteLoading}
                        onClick={handleDelete}
                    >

                        {
                            deleteLoading
                                ? "Deleting..."
                                : "Delete Membership"
                        }

                    </button>

                </div>

            </form>

        </div>

    </div>

);
}

export default EditMembership;