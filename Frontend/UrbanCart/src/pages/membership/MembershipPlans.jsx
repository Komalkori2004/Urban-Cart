import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./membership.css";

import {
    getAllMembership, purchaseMembership, verifyMembershipPayment, getMyMembership,
    getMembershipHistory, cancelMembership, checkPremiumStatus
} from "../../redux/thunks/membershipThunk";

function MembershipPlans() {

    const dispatch = useDispatch();

    const {
        membershipPlans,
        loading,
        error
    } = useSelector(
        (state) => state.membership
    );

    //     const {
    //         membershipOrder
    //     } = useSelector(
    //         (state) => state.membership
    //     );


    //     const {
    //         myMembership
    //     } = useSelector(
    //         state => state.membership
    //     );


    //     console.log(
    //         "MY MEMBERSHIP",
    //         myMembership
    //     );

    //     const {
    //         membershipHistory
    //     } = useSelector(
    //         state => state.membership
    //     );

    //     console.log(
    //         "MEMBERSHIP HISTORY",
    //         membershipHistory
    //     );
    // const {
    //     premiumStatus
    // } = useSelector(
    //     state => state.membership
    // );

    // console.log(
    //     "PREMIUM STATUS",
    //     premiumStatus
    // );
    useEffect(() => {
        dispatch(getAllMembership());
    }, [dispatch]);


    return (
        <>
            <div className="membership-container">

                <div className="membership-header">

                    <h1>
                        Membership Plans
                    </h1>

                    <p>
                        Unlock premium shopping
                        experience with exclusive
                        benefits.
                    </p>

                </div>

                <div className="membership-grid">

                    {
                        membershipPlans?.map((plan) => (

                            <div
                                key={plan._id}
                                className={`membership-card ${plan.isPopular ? "popular" : ""
                                    }`}
                            >
                                {
                                    plan.premiumBadge && (
                                        <span className="membership-badge">
                                            {plan.premiumBadge}
                                            {" "}
                                            Premium
                                        </span>
                                    )
                                }
                                <h2 className="membership-name">
                                    {plan.name}
                                </h2>

                                <p className="membership-description">
                                    {plan.description}
                                </p>
                                <div className="membership-price">

                                    <h2>
                                        ₹{plan.price}
                                    </h2>

                                    <span>
                                        / {plan.durationInDays} Days
                                    </span>

                                </div>

                                <ul className="membership-features">
                                    {
                                        plan.features?.map(
                                            (feature, index) => (
                                                <li key={index}>
                                                    ✓ {feature}
                                                </li>
                                            )
                                        )
                                    }
                                </ul>

                                <button
                                    className="membership-btn"
                                    onClick={() =>
                                        dispatch(
                                            purchaseMembership(
                                                plan._id
                                            )
                                        )
                                    }
                                >
                                    Become Premium
                                </button>

                            </div>
                        ))
                    }

                </div>

            </div>
        </>
    );
}

export default MembershipPlans;