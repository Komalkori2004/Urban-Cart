import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getMyMembership,
    cancelMembership
} from "../../redux/thunks/membershipThunk";

import "./membership.css";

function MyMembership() {

    const dispatch = useDispatch();

    const {
        myMembership,
        loading,
        error
    } = useSelector(
        state => state.membership
    );

    useEffect(() => {
        dispatch(
            getMyMembership()
        );
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!myMembership) {
        return (
            <section className="my-membership-section">

                <div className="container">

                    <div className="no-membership">

                        <h2>
                            No Active Membership
                        </h2>

                        <p>
                            Purchase a premium plan
                            to unlock exclusive benefits.
                        </p>

                    </div>

                </div>

            </section>
        );
    }

    return (
        <section className="my-membership-section">

            <div className="container">

                <div className="my-membership-card">

                    <div className="my-membership-header">

                        <span className="premium-tag">
                            {
                                myMembership
                                    .membershipPlan
                                    .premiumBadge || "👑"
                            }
                            {" "}
                            Premium Member
                        </span>

                        <h1>
                            {
                                myMembership
                                    .membershipPlan
                                    .name
                            }
                        </h1>

                        <p>
                            {
                                myMembership
                                    .membershipPlan
                                    .description
                            }
                        </p>

                    </div>

                    <div className="membership-details">

                        <div className="detail-item">
                            <h4>Status</h4>
                            <span className="active-status">
                                {
                                    myMembership
                                        .status
                                        .charAt(0)
                                        .toUpperCase()
                                }
                                {
                                    myMembership
                                        .status
                                        .slice(1)
                                }
                            </span>
                        </div>

                        <div className="detail-item">
                            <h4>Amount Paid</h4>
                            <p>
                                ₹
                                {
                                    myMembership
                                        .amountPaid
                                }
                            </p>
                        </div>

                        <div className="detail-item">
                            <h4>Start Date</h4>
                            <p>
                                {
                                    new Date(
                                        myMembership.startDate
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        }
                                    )
                                }
                            </p>
                        </div>


                        <div className="detail-item">

                            <h4>
                                Days Left
                            </h4>

                            <p>
                                {
                                    Math.ceil(
                                        (
                                            new Date(
                                                myMembership.expiryDate
                                            ) -
                                            new Date()
                                        )
                                        /
                                        (1000 * 60 * 60 * 24)
                                    )
                                }
                                {" "}
                                Days
                            </p>

                        </div>

                        <div className="detail-item">
                            <h4>
                                Payment
                            </h4>

                            <p>
                                {
                                    myMembership
                                        .paymentMethod
                                }
                            </p>
                        </div>

                    </div>

                    <div className="membership-benefits">

                        <h3>
                            Benefits
                        </h3>

                        <ul>

                            {
                                myMembership
                                    .membershipPlan
                                    .features
                                    ?.map(
                                        (
                                            feature,
                                            index
                                        ) => (

                                            <li
                                                key={
                                                    index
                                                }
                                            >
                                                ✓ {feature}
                                            </li>
                                        )
                                    )
                            }

                        </ul>

                    </div>

                    {
                        myMembership.status ===
                        "active" && (

                            <button
                                className="cancel-membership-btn"
                                onClick={() =>
                                    dispatch(
                                        cancelMembership()
                                    )
                                }
                            >
                                Cancel Membership
                            </button>
                        )
                    }
                </div>

            </div>

        </section>
    );
}

export default MyMembership;