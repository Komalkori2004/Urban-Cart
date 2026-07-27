import React, { useEffect } from "react";

import {
    useDispatch, useSelector
} from "react-redux";


import { toast } from "sonner";

import { useParams, useNavigate } from "react-router-dom";

import {    getSingleMembership,purchaseMembership, verifyMembershipPayment, getMyMembership, checkPremiumStatus } from "../../redux/thunks/membershipThunk";

import "./SingleMembership.css"

function SingleMembership() {

    const navigate = useNavigate();

    const { slug } = useParams();


    const dispatch = useDispatch();


    const { singleMembership, singleLoading, singleError } = useSelector(state => state.membership);

    useEffect(() => {

        dispatch(
            getSingleMembership(
                slug
            )
        );

    }, [dispatch, slug]);


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
            toast.error(
                resultAction.payload || "Failed to create order"
            );
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

                    const verifyResult = await dispatch(
                        verifyMembershipPayment({
                            membershipPlanId: membershipPlan._id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                    );

                    if (
                        verifyMembershipPayment.rejected.match(
                            verifyResult
                        )
                    ) {
                        toast.error("Payment verification failed");
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
                        "/membership"
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




    if (singleLoading)
        return <h2>Loading...</h2>;

    if (singleError)
        return <h2>{singleError}</h2>;






    return (

        <div className="single-membership-page">

            <div className="container">

                {/* ================= HERO ================= */}

                <section className="single-membership-hero">

                    <span className="single-membership-tag">

                        👑 UrbanCart Premium

                    </span>

                    <h1>

                        {singleMembership?.name}

                    </h1>

                    <p>

                        {singleMembership?.description}

                    </p>

                    <div className="single-membership-stats">

                        <div className="single-membership-stat">

                            <h3>

                                ₹{singleMembership?.price}

                            </h3>

                            <span>

                                Membership Price

                            </span>

                        </div>

                        <div className="single-membership-stat">

                            <h3>

                                {
                                    singleMembership?.durationInDays
                                }

                            </h3>

                            <span>

                                Days Validity

                            </span>

                        </div>

                        <div className="single-membership-stat">

                            <h3>

                                {
                                    singleMembership?.features?.length || 0
                                }

                            </h3>

                            <span>

                                Premium Benefits

                            </span>

                        </div>

                    </div>

                </section>



                {/* ================= MAIN ================= */}

                <section className="single-membership-main">

                    {/* LEFT SIDE START */}

                    <div className="single-membership-plan-card">

                        {
                            singleMembership?.isPopular && (

                                <span className="single-membership-badge">

                                    🔥 Most Popular

                                </span>

                            )
                        }

                        <div className="single-membership-price-box">

                            <h2>

                                ₹{singleMembership?.price}

                            </h2>

                            <span>

                                {singleMembership?.durationInDays} Days Membership

                            </span>

                        </div>

                        <div className="single-membership-plan-info">

                            <div>

                                <span>Discount</span>

                                <strong>

                                    {singleMembership?.discountPercentage}%

                                </strong>

                            </div>

                            <div>

                                <span>Validity</span>

                                <strong>

                                    {singleMembership?.durationInDays} Days

                                </strong>

                            </div>

                        </div>

                        <button
                            className="single-membership-btn"
                            onClick={() =>
                                handlePurchase(singleMembership._id)
                            }
                        >
                            Become Premium
                        </button>

                    </div>



                    {/* RIGHT SIDE */}

                    <div className="single-membership-benefits">

                        <span className="single-membership-benefits-tag">

                            Premium Benefits

                        </span>

                        <h2>

                            Everything Included

                        </h2>

                        <p>

                            Enjoy exclusive premium advantages designed
                            to elevate your UrbanCart shopping experience.

                        </p>

                        <div className="single-membership-benefit-grid">

                            {
                                singleMembership?.features?.map(

                                    (feature, index) => (

                                        <div
                                            key={index}
                                            className="single-membership-benefit-card"
                                        >

                                            <div className="single-membership-benefit-icon">

                                                ✓

                                            </div>

                                            <div>

                                                <h3>

                                                    {feature}

                                                </h3>

                                                <span>

                                                    Included with this membership

                                                </span>

                                            </div>

                                        </div>

                                    )

                                )
                            }

                        </div>

                    </div>
                </section>


                {/* ================= PREMIUM BENEFITS ================= */}

                <section className="single-membership-extra">

                    <div className="single-membership-extra-header">

                        <span>

                            Premium Advantages

                        </span>

                        <h2>

                            Everything You Unlock

                        </h2>

                        <p>

                            Every membership comes with premium shopping advantages designed
                            to give you a better UrbanCart experience.

                        </p>

                    </div>

                    <div className="single-membership-extra-grid">

                        <div className="single-membership-extra-card">

                            <h3>

                                🎁 Discount

                            </h3>

                            <p>

                                Save up to

                                <strong>

                                    {" "}
                                    {singleMembership?.discountPercentage}% OFF

                                </strong>

                                {" "}
                                on eligible purchases.

                            </p>

                        </div>

                        <div className="single-membership-extra-card">

                            <h3>

                                🚚 Free Shipping

                            </h3>

                            <p>

                                {
                                    singleMembership?.freeShipping
                                        ? "Unlimited free shipping on eligible orders."
                                        : "Free shipping is not included in this plan."
                                }

                            </p>

                        </div>

                        <div className="single-membership-extra-card">

                            <h3>

                                ⚡ Early Access

                            </h3>

                            <p>

                                {
                                    singleMembership?.earlyAccess
                                        ? "Get early access to new collections and exclusive launches."
                                        : "Early access is not available in this plan."
                                }

                            </p>

                        </div>

                        <div className="single-membership-extra-card">

                            <h3>

                                🎧 Priority Support

                            </h3>

                            <p>

                                {
                                    singleMembership?.prioritySupport
                                        ? "Receive priority customer support whenever you need help."
                                        : "Standard customer support is available."
                                }

                            </p>

                        </div>

                    </div>

                </section>




                {/* ================= FINAL CTA ================= */}
                {/* ================= PLAN OVERVIEW ================= */}

                <section className="single-membership-overview">

                    <div className="single-membership-overview-header">

                        <span>

                            Membership Overview

                        </span>

                        <h2>

                            Plan Information

                        </h2>

                        <p>

                            A quick overview of everything included with your membership.

                        </p>

                    </div>

                    <div className="single-membership-overview-grid">

                        <div className="single-membership-overview-card">

                            <span>
                                💰
                            </span>

                            <h4>
                                Membership Price
                            </h4>

                            <strong>

                                ₹{singleMembership?.price}

                            </strong>

                        </div>

                        <div className="single-membership-overview-card">

                            <span>
                                📅
                            </span>

                            <h4>
                                Validity
                            </h4>

                            <strong>

                                {singleMembership?.durationInDays} Days

                            </strong>

                        </div>

                        <div className="single-membership-overview-card">

                            <span>
                                🎁
                            </span>

                            <h4>
                                Discount
                            </h4>

                            <strong>

                                {singleMembership?.discountPercentage}%

                            </strong>

                        </div>

                        <div className="single-membership-overview-card">

                            <span>
                                🚚
                            </span>

                            <h4>
                                Free Shipping
                            </h4>

                            <strong>

                                {
                                    singleMembership?.freeShipping
                                        ? "Included"
                                        : "Not Included"
                                }

                            </strong>

                        </div>

                        <div className="single-membership-overview-card">

                            <span>
                                🎧
                            </span>

                            <h4>
                                Priority Support
                            </h4>

                            <strong>

                                {
                                    singleMembership?.prioritySupport
                                        ? "Available"
                                        : "Unavailable"
                                }

                            </strong>

                        </div>

                        <div className="single-membership-overview-card">

                            <span>
                                ⚡
                            </span>

                            <h4>
                                Early Access
                            </h4>

                            <strong>

                                {
                                    singleMembership?.earlyAccess
                                        ? "Included"
                                        : "Not Included"
                                }

                            </strong>

                        </div>

                    </div>

                </section>

            </div>

        </div>

    )

    return












}

export default SingleMembership;