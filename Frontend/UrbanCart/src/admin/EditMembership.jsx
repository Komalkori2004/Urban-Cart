import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import { updateMembershipPlan, deleteMembershipPlan }
    from "../redux/thunks/membershipThunk";

function EditMembership() {

    const dispatch =
        useDispatch();

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

   return (

    <div
        style={{
            padding: "40px"
        }}
    >

        <h1>
            Edit Membership
        </h1>

        <form
            onSubmit={handleSubmit}
        >

            <input
                type="text"
                name="name"
                placeholder="Membership Name"
                value={formData.name}
                onChange={handleChange}
            />

            <br /><br />

            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="number"
                name="durationInDays"
                placeholder="Duration In Days"
                value={formData.durationInDays}
                onChange={handleChange}
            />

            <br /><br />

            <textarea
                name="features"
                placeholder="Feature1, Feature2, Feature3"
                value={formData.features}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="number"
                name="discountPercentage"
                placeholder="Discount Percentage"
                value={formData.discountPercentage}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                name="premiumBadge"
                placeholder="Premium Badge"
                value={formData.premiumBadge}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="number"
                name="maxDiscountAmount"
                placeholder="Max Discount Amount"
                value={formData.maxDiscountAmount}
                onChange={handleChange}
            />

            <br /><br />

            <label>
                <input
                    type="checkbox"
                    name="freeShipping"
                    checked={formData.freeShipping}
                    onChange={handleChange}
                />
                Free Shipping
            </label>

            <br /><br />

            <label>
                <input
                    type="checkbox"
                    name="prioritySupport"
                    checked={formData.prioritySupport}
                    onChange={handleChange}
                />
                Priority Support
            </label>

            <br /><br />

            <label>
                <input
                    type="checkbox"
                    name="earlyAccess"
                    checked={formData.earlyAccess}
                    onChange={handleChange}
                />
                Early Access
            </label>

            <br /><br />

            <label>
                <input
                    type="checkbox"
                    name="isPopular"
                    checked={formData.isPopular}
                    onChange={handleChange}
                />
                Popular
            </label>

            <br /><br />

            <label>
                <input
                    type="checkbox"
                    name="isRecommended"
                    checked={formData.isRecommended}
                    onChange={handleChange}
                />
                Recommended
            </label>

            <br /><br />

            <label>
                <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                />
                Active
            </label>

            <br /><br />

            <button
                type="submit"
            >
                {
                    updateLoading
                        ? "Updating..."
                        : "Update Membership"
                }
            </button>

            <button
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
            updateSuccess && (
                <p>
                    Membership updated successfully
                </p>
            )
        }

        {
            updateError && (
                <p>
                    {updateError}
                </p>
            )
        }

        {
            deleteSuccess && (
                <p>
                    Membership deleted successfully
                </p>
            )
        }

        {
            deleteError && (
                <p>
                    {deleteError}
                </p>
            )
        }

    </div>
);
}

export default EditMembership;