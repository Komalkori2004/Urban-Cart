import React, {
    useEffect
} from "react";


import "./style/Adminmembership.css"
import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useNavigate
} from "react-router-dom";

import {
    getAllMembership
}
    from "../redux/thunks/membershipThunk";

function MembershipManagement() {

    const dispatch =
        useDispatch();

    const navigate =
        useNavigate();

    const {
        membershipPlans,
        loading,
        error
    } = useSelector(
        state =>
            state.membership
    );

    useEffect(() => {

        dispatch(
            getAllMembership()
        );

    }, [dispatch]);

  return (

    <div className="admin-membership-page">

        <div className="admin-membership-header">

            <div className="admin-membership-hero">

                <span className="admin-membership-tag">
                    👑 UrbanCart Admin
                </span>

                <h1>
                    Membership Management
                </h1>

                <p>
                    Manage all premium membership plans, pricing, benefits,
                    recommendations and availability from one dashboard.
                </p>

            </div>

            <div className="admin-membership-actions">

                <button
                    className="admin-create-btn"
                    onClick={() =>
                        navigate("/admin/create-membership")
                    }
                >
                    + Create Membership
                </button>

                <button
                    className="admin-stats-btn"
                    onClick={() =>
                        navigate("/admin/membership-stats")
                    }
                >
                    📊 View Stats
                </button>

            </div>

        </div>


        {
            membershipPlans?.length === 0 ? (

                <div className="admin-membership-empty">

                    <div className="admin-membership-empty-icon">
                        👑
                    </div>

                    <h2>
                        No Membership Plans Found
                    </h2>

                    <p>
                        Create your first membership plan to start offering
                        premium benefits to your customers.
                    </p>

                    <button
                        className="admin-create-btn"
                        onClick={() =>
                            navigate("/admin/create-membership")
                        }
                    >
                        Create Membership
                    </button>

                </div>

            ) : (

                <div className="admin-membership-grid">

                    {

                        membershipPlans.map((plan) => (

                            <div
                                key={plan._id}
                                className="admin-membership-card"
                            >

                                {
                                    plan.isPopular && (

                                        <span className="admin-membership-badge">

                                            ⭐ Popular

                                        </span>

                                    )
                                }

                                <h2 className="admin-membership-name">

                                    {plan.name}

                                </h2>

                                <p className="admin-membership-description">

                                    {plan.description}

                                </p>

                                <div className="admin-membership-price">

                                    <h2>

                                        ₹{plan.price}

                                    </h2>

                                    <span>

                                        / {plan.durationInDays} Days

                                    </span>

                                </div>

                                <div className="admin-membership-features">

                                    <div>

                                        <span>Discount</span>

                                        <strong>

                                            {plan.discountPercentage}%

                                        </strong>

                                    </div>

                                    <div>

                                        <span>Duration</span>

                                        <strong>

                                            {plan.durationInDays} Days

                                        </strong>

                                    </div>

                                </div>

                                <div className="admin-membership-status">

                                    {

                                        plan.isPopular && (

                                            <span className="status popular">

                                                ⭐ Popular

                                            </span>

                                        )

                                    }

                                    {

                                        plan.isRecommended && (

                                            <span className="status recommended">

                                                ✔ Recommended

                                            </span>

                                        )

                                    }

                                    <span
                                        className={
                                            plan.isActive
                                                ? "status active"
                                                : "status inactive"
                                        }
                                    >

                                        {
                                            plan.isActive
                                                ? "🟢 Active"
                                                : "🔴 Inactive"
                                        }

                                    </span>

                                </div>

                                <button
                                    className="admin-membership-btn"
                                    onClick={() =>
                                        navigate(
                                            `/admin/edit-membership/${plan._id}`,
                                            {
                                                state: {
                                                    plan
                                                }
                                            }
                                        )
                                    }
                                >

                                    Edit Membership

                                </button>

                            </div>

                        ))

                    }

                </div>

            )

        }

    </div>

);




}

export default MembershipManagement;