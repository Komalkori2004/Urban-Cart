import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    createMembershipPlan
} from "../redux/thunks/membershipThunk";

function CreateMembership() {

    const dispatch = useDispatch();

    const {
        createLoading,
        createError,
        createSuccess
    } = useSelector(
        state => state.membership
    );

    const [formData, setFormData] =
        useState({

            name: "",

            description: "",

            price: "",

            durationInDays: "",

            premiumBadge: "",

            features: []
        });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            const payload = {

                ...formData,

                price:
                    Number(
                        formData.price
                    ),

                durationInDays:
                    Number(
                        formData.durationInDays
                    ),

                features: [
                    "Free Shipping",
                    "Priority Support"
                ]
            };

            console.log(payload);

            await dispatch(
                createMembershipPlan(
                    payload
                )
            );
        };

    return (

        <div
            style={{
                padding: "40px"
            }}
        >

            <h1>
                Create Membership
            </h1>

            <form
                onSubmit={
                    handleSubmit
                }
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={
                        formData.name
                    }
                    onChange={
                        handleChange
                    }
                />

                <br />
                <br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={
                        formData.description
                    }
                    onChange={
                        handleChange
                    }
                />

                <br />
                <br />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={
                        formData.price
                    }
                    onChange={
                        handleChange
                    }
                />

                <br />
                <br />

                <input
                    type="number"
                    name="durationInDays"
                    placeholder="Duration"
                    value={
                        formData.durationInDays
                    }
                    onChange={
                        handleChange
                    }
                />

                <br />
                <br />

                <input
                    type="text"
                    name="premiumBadge"
                    placeholder="Premium Badge"
                    value={
                        formData.premiumBadge
                    }
                    onChange={
                        handleChange
                    }
                />

                <br />
                <br />

                <button
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
                (
                    <p>
                        Membership
                        created
                        successfully
                    </p>
                )
            }

            {
                createError &&
                (
                    <p>
                        {createError}
                    </p>
                )
            }

        </div>
    );
}

export default CreateMembership;