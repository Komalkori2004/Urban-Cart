import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./memberShip-History.css";

import { getMembershipHistory } from "../../redux/thunks/membershipThunk";




function MembershipHistory() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        membershipHistory,
        loading,
        error
    } = useSelector(
        state => state.membership
    );

    useEffect(() => {

        dispatch(
            getMembershipHistory()
        );

    }, [dispatch]);

    if (loading)
        return <p>Loading...</p>;

    if (error)
        return <p>{error}</p>;

    return (

        <section className="membership-history">

            <div className="container">

                <div className="membership-history-hero">

                    <span className="membership-history-tag">
                        👑 UrbanCart Premium
                    </span>

                    <h1>
                        Membership History
                    </h1>

                    <p>
                        Track all your premium memberships, view purchase history,
                        monitor active plans and manage your UrbanCart Premium journey.
                    </p>

                </div>

                {/* Summary */}

                <div className="history-summary">

                    <div className="summary-card">

                        <h4>
                            Total Memberships
                        </h4>

                        <h2>
                            {membershipHistory.length}
                        </h2>

                    </div>

                    <div className="summary-card">

                        <h4>
                            Active
                        </h4>

                        <h2>

                            {
                                membershipHistory.filter(
                                    item => item.status === "active"
                                ).length
                            }

                        </h2>

                    </div>

                    <div className="summary-card">

                        <h4>
                            Cancelled
                        </h4>

                        <h2>

                            {
                                membershipHistory.filter(
                                    item => item.status === "cancelled"
                                ).length
                            }

                        </h2>

                    </div>

                    <div className="summary-card">

                        <h4>
                            Expired
                        </h4>

                        <h2>

                            {
                                membershipHistory.filter(
                                    item => item.status === "expired"
                                ).length
                            }

                        </h2>

                    </div>

                </div>

                <div className="history-grid">

                    {


                        membershipHistory?.length === 0 ? (

                            <div className="empty-history">

                                <div className="empty-history-icon">
                                    👑
                                </div>

                                <h2>
                                    No Membership History
                                </h2>

                                <p>
                                    You haven't purchased any membership yet.
                                </p>

                            </div>

                        ) :

                            (membershipHistory?.map(
                                (membership) => (

                                    <div
                                        key={membership._id}
                                        className="history-card"
                                    >

                                        <div className="history-card-top">

                                            <div className="history-plan">

                                                <span className="history-plan-badge">
                                                    {membership.membershipPlan.premiumBadge || "👑"}
                                                </span>

                                                <div>

                                                    <h2>
                                                        {membership.membershipPlan.name}
                                                    </h2>

                                                    <p className="history-description">
                                                        {membership.membershipPlan.description}
                                                    </p>

                                                </div>

                                            </div>

                                            <span
                                                className={
                                                    membership.status === "active"
                                                        ? "status-active"
                                                        : membership.status === "cancelled"
                                                            ? "status-cancelled"
                                                            : "status-expired"
                                                }
                                            >

                                                {
                                                    membership.status.charAt(0).toUpperCase() +
                                                    membership.status.slice(1)
                                                }

                                            </span>

                                        </div>

                                        <div className="history-price">

                                            <span className="price">

                                                ₹{membership.amountPaid}

                                            </span>

                                            <span className="price-label">
                                                Paid
                                            </span>

                                        </div>

                                        <div className="history-info">

                                            <div className="history-info-card">

                                                <span>
                                                    📅
                                                </span>

                                                <div>

                                                    <small>
                                                        Purchased
                                                    </small>

                                                    <strong>

                                                        {
                                                            new Date(
                                                                membership.createdAt
                                                            ).toLocaleDateString("en-IN")
                                                        }

                                                    </strong>

                                                </div>

                                            </div>

                                            <div className="history-info-card">

                                                <span>
                                                    ⏳
                                                </span>

                                                <div>

                                                    <small>
                                                        Duration
                                                    </small>

                                                    <strong>

                                                        {
                                                            membership.membershipPlan.durationInDays
                                                        }

                                                        {" "}
                                                        Days

                                                    </strong>

                                                </div>

                                            </div>

                                            <div className="history-info-card">

                                                <span>
                                                    💳
                                                </span>

                                                <div>

                                                    <small>
                                                        Payment
                                                    </small>

                                                    <strong>

                                                        {
                                                            membership.paymentMethod
                                                        }

                                                    </strong>

                                                </div>

                                            </div>

                                            <div className="history-info-card">

                                                <span>
                                                    📆
                                                </span>

                                                <div>

                                                    <small>
                                                        Expiry
                                                    </small>

                                                    <strong>

                                                        {
                                                            new Date(
                                                                membership.expiryDate
                                                            ).toLocaleDateString("en-IN")
                                                        }

                                                    </strong>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                )
                            )

                            )
                    }

                </div>

            </div>

        </section>
    );
}





export default MembershipHistory;