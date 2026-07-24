import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "./membership.css";

import { getMembershipHistory } from "../../redux/thunks/membershipThunk";




function MembershipHistory() {

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

                <div className="membership-header">

                    <h1>
                        Membership History
                    </h1>

                    <p>
                        View all your memberships
                    </p>

                </div>

                <div className="history-grid">

                    {
                        membershipHistory?.map(
                            (membership) => (

                                <div
                                    key={membership._id}
                                    className="history-card"
                                >

                                    <div className="history-header">

                                        <h2>
                                            {
                                                membership
                                                    .membershipPlan
                                                    .premiumBadge
                                            }

                                            {" "}

                                            {
                                                membership
                                                    .membershipPlan
                                                    .name
                                            }
                                        </h2>

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
                                                membership.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                membership.status.slice(1)
                                            }
                                        </span>

                                    </div>

                                    <p>
                                        {
                                            membership
                                                .membershipPlan
                                                .description
                                        }
                                    </p>

                                    <div className="history-price">

                                        ₹
                                        {
                                            membership
                                                .amountPaid
                                        }

                                    </div>

                                    <div className="history-info">

                                        <div>
                                            <strong>
                                                Duration:
                                            </strong>

                                            {" "}

                                            {
                                                membership
                                                    .membershipPlan
                                                    .durationInDays
                                            }

                                            Days
                                        </div>

                                        <div>
                                            <strong>
                                                Payment:
                                            </strong>

                                            {" "}

                                            {
                                                membership
                                                    .paymentMethod
                                            }
                                        </div>

                                        <div>
                                            <strong>
                                                Purchased:
                                            </strong>

                                            {" "}

                                            {
                                                new Date(
                                                    membership.createdAt
                                                )
                                                    .toLocaleDateString(
                                                        "en-IN"
                                                    )
                                            }
                                        </div>

                                        <div>
                                            <strong>
                                                Expiry:
                                            </strong>

                                            {" "}

                                            {
                                                new Date(
                                                    membership.expiryDate
                                                )
                                                    .toLocaleDateString(
                                                        "en-IN"
                                                    )
                                            }
                                        </div>

                                    </div>

                                </div>
                            )
                        )
                    }

                </div>

            </div>

        </section>
    );
}





export default MembershipHistory;