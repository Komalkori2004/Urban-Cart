import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

    const [formData,
        setFormData] =
        useState({

            id: "",

            name: "",

            description: "",

            price: "",

            durationInDays: ""
        });

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value
            });
        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            await dispatch(
                updateMembershipPlan({

                    id:
                        formData.id,

                    membershipData: {

                        name:
                            formData.name,

                        description:
                            formData.description,

                        price:
                            Number(
                                formData.price
                            ),

                        durationInDays:
                            Number(
                                formData.durationInDays
                            )
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
                deleteMembershipPlan(
                    formData.id
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
                Edit Membership
            </h1>

            <form
                onSubmit={
                    handleSubmit
                }
            >

                <input
                    type="text"
                    name="id"
                    placeholder="Membership Id"
                    value={
                        formData.id
                    }
                    onChange={
                        handleChange
                    }
                />

                <br /><br />

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

                <br /><br />

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

                <br /><br />

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

                <br /><br />

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

                <br /><br />

                <button
                    type="submit"
                >
                    {
                        updateLoading
                            ?
                            "Updating..."
                            :
                            "Update Membership"
                    }
                </button>



                <br />
                <br />

                <button
                    type="button"
                    onClick={
                        handleDelete
                    }
                >
                    {
                        deleteLoading
                            ?
                            "Deleting..."
                            :
                            "Delete Membership"
                    }
                </button>

            </form>

            {
                updateSuccess &&
                (
                    <p>
                        Membership
                        updated
                        successfully
                    </p>
                )
            }

            {
                updateError &&
                (
                    <p>
                        {
                            updateError
                        }
                    </p>
                )
            }

        </div>
    );
}

export default EditMembership;