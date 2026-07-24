import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./membership.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

import {
    getAllMembership, purchaseMembership, verifyMembershipPayment, getMyMembership,
    getMembershipHistory, cancelMembership, checkPremiumStatus
} from "../../redux/thunks/membershipThunk";

function MembershipPlans() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        membershipPlans,
        loading,
        error
    } = useSelector(
        (state) => state.membership
    );

    useEffect(() => {
        dispatch(getAllMembership());
    }, [dispatch]);



    const handlePurchase = async (planId) => {

        const resultAction =
            await dispatch(
                purchaseMembership(planId)
            );

        if (
            !purchaseMembership.fulfilled.match(
                resultAction
            )
        ) {
            toast.error("Failed to create order");
            return;
        }

        const {
            order,
            membershipPlan
        } = resultAction.payload;

        const options = {

            key:
                import.meta.env.VITE_RAZORPAY_KEY_ID,

            amount:
                order.amount,

            currency:
                order.currency,

            order_id:
                order.id,

            name:
                "UrbanCart",

            description:
                membershipPlan.name,

            handler:
                async function (
                    response
                ) {

                    const verifyResult =
                        console.log({
                            membershipPlanId: membershipPlan._id,
                            razorpay_payment_id:
                                response.razorpay_payment_id,
                            razorpay_order_id:
                                response.razorpay_order_id,
                            razorpay_signature:
                                response.razorpay_signature,
                        });
                    await dispatch(
                        verifyMembershipPayment({

                            membershipPlanId:
                                membershipPlan._id,

                            razorpay_payment_id:
                                response.razorpay_payment_id,

                            razorpay_order_id:
                                response.razorpay_order_id,

                            razorpay_signature:
                                response.razorpay_signature,
                        })
                    );

                    if (
                        verifyMembershipPayment.rejected.match(
                            verifyResult
                        )
                    ) {

                        toast.error(
                            "Payment verification failed"
                        );

                        return;
                    }

                    await dispatch(
                        getMyMembership()
                    );

                    await dispatch(
                        checkPremiumStatus()
                    );

                    toast.success(
                        "Membership Activated"
                    );

                    navigate(
                        "/my-membership"
                    );
                },

            modal: {

                ondismiss: function () {

                    toast.error(
                        "Payment cancelled"
                    );
                }
            }
        };

        const razorpay =
            new window.Razorpay(
                options
            );

        razorpay.open();
    };


    return (
        <>
            <div className="membership-container">
                <div className="membership-header">

                    <span className="membership-tag">
                        ✨ UrbanCart Premium
                    </span>

                    <h1>
                        Unlock the Ultimate
                        Shopping Experience
                    </h1>

                    <p>
                        Become an UrbanCart Premium Member and enjoy
                        exclusive discounts, faster delivery,
                        priority support, and member-only rewards
                        designed to elevate every purchase.
                    </p>

                    <div className="membership-header-features">

                        <div className="header-feature">
                            <h3>🚚</h3>
                            <span>Free Shipping</span>
                        </div>

                        <div className="header-feature">
                            <h3>💎</h3>
                            <span>Exclusive Rewards</span>
                        </div>

                        <div className="header-feature">
                            <h3>⚡</h3>
                            <span>Priority Support</span>
                        </div>

                    </div>

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

                                    <h2>₹{plan.price}</h2>

                                    <span>{plan.durationInDays} Days Membership</span>

                                </div>

                                <div className="price-divider"></div>

                                <ul className="membership-features">
                                    {
                                        plan.features?.map(
                                            (feature, index) => (
                                                <li key={index}>
                                                    <span>✔</span>
                                                    {feature}
                                                </li>
                                            )
                                        )
                                    }
                                </ul>

                                <button
                                    className="membership-btn"
                                    onClick={() =>
                                        handlePurchase(
                                            plan._id
                                        )
                                    }
                                >
                                    Become Premium
                                </button>
                                <Link
                                    to={`/membership/${plan.slug}`}
                                    className="membership-details-btn"
                                >
                                    View Details →
                                </Link>

                            </div>
                        ))
                    }

                </div>

            </div>
        </>
    );
}

export default MembershipPlans;