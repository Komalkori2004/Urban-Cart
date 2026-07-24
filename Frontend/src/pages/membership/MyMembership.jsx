import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    getMyMembership,
    cancelMembership
} from "../../redux/thunks/membershipThunk";

import "./MyMembership.css";

function MyMembership() {
    const navigate = useNavigate();

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
            <div className="empty-membership-card">

                <div className="empty-icon">
                    👑
                </div>

                <h2>
                    No Active Membership
                </h2>

                <p>
                    You haven't purchased an UrbanCart Premium membership yet.
                    Unlock premium shopping, exclusive discounts, faster delivery,
                    and priority support.
                </p>

                <div className="empty-benefits">

                    <div className="benefit-item">
                        ✓ Free Shipping
                    </div>

                    <div className="benefit-item">
                        ✓ Exclusive Discounts
                    </div>

                    <div className="benefit-item">
                        ✓ Priority Support
                    </div>

                    <div className="benefit-item">
                        ✓ Early Access
                    </div>

                </div>

                <button
                    className="explore-membership-btn"
                    onClick={() => navigate("/membership-plans")}
                >
                    Explore Membership Plans
                </button>

            </div>
        );
    }
return (
    <section className="my-membership-section">

        <div className="container">

            {/* Hero */}
            <div className="my-membership-hero">

                <span className="membership-tag">
                    👑 UrbanCart Premium
                </span>

                <h1>
                    My Membership
                </h1>

                <p>
                    Manage your premium subscription, track your membership
                    status, and enjoy exclusive shopping benefits designed
                    for UrbanCart Premium members.
                </p>

            </div>

            {/* Empty State */}
            {!myMembership ? (

                <div className="empty-membership-card">

                    <div className="empty-icon">
                        👑
                    </div>

                    <h2>
                        No Active Membership
                    </h2>

                    <p>
                        You haven't purchased an UrbanCart Premium membership yet.
                        Unlock premium shopping, exclusive discounts, faster
                        delivery and priority support.
                    </p>

                    <div className="empty-benefits">

                        <div className="benefit-item">
                            ✓ Free Shipping
                        </div>

                        <div className="benefit-item">
                            ✓ Exclusive Discounts
                        </div>

                        <div className="benefit-item">
                            ✓ Priority Support
                        </div>

                        <div className="benefit-item">
                            ✓ Early Access
                        </div>

                    </div>

                    <button
                        className="explore-membership-btn"
                        onClick={() => navigate("/membership-plans")}
                    >
                        Explore Membership Plans
                    </button>

                </div>

            ) : (

                <div className="my-membership-card">

                    <div className="membership-top">

                        <span className="premium-tag">
                            {myMembership.membershipPlan.premiumBadge || "👑"}{" "}
                            Premium Member
                        </span>

                        <h2>
                            {myMembership.membershipPlan.name}
                        </h2>

                        <p>
                            {myMembership.membershipPlan.description}
                        </p>

                    </div>

                    <div className="membership-details">

                        <div className="detail-item">
                            <h4>Status</h4>

                            <span className="active-status">
                                {myMembership.status.charAt(0).toUpperCase()}
                                {myMembership.status.slice(1)}
                            </span>
                        </div>

                        <div className="detail-item">
                            <h4>Amount Paid</h4>

                            <p>
                                ₹{myMembership.amountPaid}
                            </p>
                        </div>

                        <div className="detail-item">

                            <h4>Start Date</h4>

                            <p>
                                {new Date(
                                    myMembership.startDate
                                ).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>

                        </div>

                        <div className="detail-item">

                            <h4>Days Left</h4>

                            <p>
                                {Math.max(
                                    0,
                                    Math.ceil(
                                        (
                                            new Date(myMembership.expiryDate) -
                                            new Date()
                                        ) /
                                        (1000 * 60 * 60 * 24)
                                    )
                                )}{" "}
                                Days
                            </p>

                        </div>

                        <div className="detail-item">

                            <h4>Payment</h4>

                            <p>
                                {myMembership.paymentMethod}
                            </p>

                        </div>

                    </div>

                    <div className="membership-benefits">

                        <h3>
                            Membership Benefits
                        </h3>

                        <ul>

                            {myMembership.membershipPlan.features?.map(
                                (feature, index) => (

                                    <li key={index}>

                                        <span className="benefit-check">
                                            ✔
                                        </span>

                                        {feature}

                                    </li>

                                )
                            )}

                        </ul>

                    </div>

                    {myMembership.status === "active" && (

                        <button
                            className="cancel-membership-btn"
                            onClick={() => dispatch(cancelMembership())}
                        >
                            Cancel Premium Plan
                        </button>

                    )}

                </div>

            )}

        </div>

    </section>
);
}

export default MyMembership;