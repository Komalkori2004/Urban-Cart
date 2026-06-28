import React, { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../pages/membership/membership.css"

import "../Auth/auth.css"
import { useLocation } from "react-router-dom";
import { updateMembershipPlan, deleteMembershipPlan }
    from "../redux/thunks/membershipThunk";

function EditMembership() {

    const dispatch =
        useDispatch();

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
    const handleSubmit =
        async (e) => {

            e.preventDefault();

            await dispatch(
                updateMembershipPlan({

                    id,

                    membershipData: {
                        name: formData.name,
                        description: formData.description,
                        price: Number(formData.price),
                        durationInDays: Number(formData.durationInDays)
                    }
                })
            );
        };



    const handleDelete =
        async () => {

            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this membership?"
                );

            if (!confirmDelete)
                return;

            await dispatch(
                deleteMembershipPlan(id)
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

        <div className="auth-container">

            <div className="auth-box">

                <h1 className="auth-title">
                    Edit Membership
                </h1>

                <p className="auth-subtitle">
                    Update your premium membership plan details.
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
                        placeholder="Feature1, Feature2, Feature3"
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

                    <div className="membership-checkboxes">

                        <label>
                            <input
                                type="checkbox"
                                name="freeShipping"
                                checked={formData.freeShipping}
                                onChange={handleChange}
                            />
                            Free Shipping
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="prioritySupport"
                                checked={formData.prioritySupport}
                                onChange={handleChange}
                            />
                            Priority Support
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="earlyAccess"
                                checked={formData.earlyAccess}
                                onChange={handleChange}
                            />
                            Early Access
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="isPopular"
                                checked={formData.isPopular}
                                onChange={handleChange}
                            />
                            Popular
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="isRecommended"
                                checked={formData.isRecommended}
                                onChange={handleChange}
                            />
                            Recommended
                        </label>

                        <label>
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
                            updateLoading
                                ? "Updating..."
                                : "Update Membership"
                        }
                    </button>

                    <button
                        className="auth-btn delete-btn"
                        type="button"
                        onClick={handleDelete}
                    >
                        {
                            deleteLoading
                                ? "Deleting..."
                                : "Delete Membership"
                        }
                    </button>

                </form>

                {
                    updateSuccess &&
                    <p className="auth-success">
                        Membership updated successfully
                    </p>
                }

                {
                    updateError &&
                    <p className="auth-error">
                        {updateError}
                    </p>
                }

                {
                    deleteSuccess &&
                    <p className="auth-success">
                        Membership deleted successfully
                    </p>
                }

                {
                    deleteError &&
                    <p className="auth-error">
                        {deleteError}
                    </p>
                }

            </div>

        </div>
    );
}

export default EditMembership;