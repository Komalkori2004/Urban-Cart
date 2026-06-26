import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllMembership, purchaseMembership, verifyMembershipPayment, getMyMembership, getMembershipHistory } from "../redux/thunks/membershipThunk";

function MembershipPlans() {

    const dispatch = useDispatch();

    const {
        membershipPlans,
        loading,
        error
    } = useSelector(
        (state) => state.membership
    );

    const {
        membershipOrder
    } = useSelector(
        (state) => state.membership
    );


    const {
        myMembership
    } = useSelector(
        state => state.membership
    );


    console.log(
        "MY MEMBERSHIP",
        myMembership
    );

    const {
        membershipHistory
    } = useSelector(
        state => state.membership
    );

    console.log(
        "MEMBERSHIP HISTORY",
        membershipHistory
    );

    useEffect(() => {
        dispatch(getAllMembership());
    }, [dispatch]);


    return (
        <div className="container">

            <h1>Membership Plans</h1>

            {loading && (
                <p>Loading...</p>
            )}

            {error && (
                <p>{error}</p>
            )}

            {
                membershipPlans?.map(
                    (plan) => (
                        <div
                            key={plan._id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "20px",
                                marginBottom: "20px"
                            }}
                        >
                            <h2>
                                {plan.premiumBadge}
                                {" "}
                                {plan.name}
                            </h2>

                            <p>
                                {plan.description}
                            </p>

                            <h3>
                                ₹{plan.price}
                            </h3>

                            <p>
                                Duration:
                                {" "}
                                {plan.durationInDays}
                                {" "}
                                days
                            </p>

                            <ul>
                                {
                                    plan.features?.map(
                                        (feature, index) => (
                                            <li key={index}>
                                                {feature}
                                            </li>
                                        )
                                    )
                                }
                            </ul>

                            <button
                                onClick={() =>
                                    dispatch(
                                        purchaseMembership(
                                            plan._id
                                        )
                                    )
                                }
                            >
                                Buy Membership
                            </button><br />

                            {
                                membershipOrder?.membershipPlan?._id ===
                                plan._id && (

                                    <button
                                        onClick={() =>
                                            dispatch(
                                                verifyMembershipPayment({
                                                    razorpay_order_id:
                                                        membershipOrder.order.id,

                                                    razorpay_payment_id:
                                                        "pay_test_123",

                                                    razorpay_signature:
                                                        "test_signature",

                                                    membershipPlanId:
                                                        membershipOrder
                                                            .membershipPlan
                                                            ._id
                                                })
                                            )
                                        }
                                    >
                                        Verify Payment
                                    </button>
                                )
                            }
                        </div>
                    )
                )
            }

            <button
                onClick={() =>
                    dispatch(
                        getMyMembership()
                    )
                }
            >
                Get My Membership
            </button>
            <br />



            <button
                onClick={() =>
                    dispatch(
                        getMembershipHistory()
                    )
                }
            >
                Get Membership History
            </button>
        </div>
    );
}

export default MembershipPlans;