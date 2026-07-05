import React, {
    useEffect
} from "react";


import "../pages/membership/membership.css"
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

        <div className="membership-management">

            <div className="management-header">

                <h1>
                    Membership Management
                </h1>

                <div className="management-actions">

                    <button
                        onClick={() =>
                            navigate(
                                "/admin/create-membership"
                            )
                        }
                    >
                        Create
                    </button>


                    <button
                        onClick={() =>
                            navigate(
                                "/admin/membership-stats"
                            )
                        }
                    >
                        Stats
                    </button>

                </div>

            </div>

            <div className="membership-grid">

                {membershipPlans?.map(
                    plan => (

                        <div
                            key={plan._id}
                            className={`membership-card ${plan.isPopular
                                ? "popular"
                                : ""
                                }`}
                        >

                            {
                                plan.isPopular && (
                                    <span
                                        className="membership-badge"
                                    >
                                        Popular
                                    </span>
                                )
                            }

                            <h2
                                className="membership-name"
                            >
                                {plan.name}
                            </h2>

                            <p
                                className="membership-description"
                            >
                                {plan.description}
                            </p>

                            <div
                                className="membership-price"
                            >

                                <h2>
                                    ₹{plan.price}
                                </h2>

                                <span>
                                    /
                                    {
                                        plan.durationInDays
                                    }
                                    Days
                                </span>

                            </div>

                            <div
                                className="membership-meta"
                            >

                                <span>
                                    Popular:
                                    {
                                        plan.isPopular
                                            ? " Yes"
                                            : " No"
                                    }
                                </span>

                                <span>
                                    Recommended:
                                    {
                                        plan.isRecommended
                                            ? " Yes"
                                            : " No"
                                    }
                                </span>

                                <span>
                                    Status:
                                    {
                                        plan.isActive
                                            ? " Active"
                                            : " Inactive"
                                    }
                                </span>

                            </div>

                            <button
                                className="membership-btn"
                                onClick={() =>
                                    navigate(
                                        `/admin/edit-membership/${plan._id}`,
                                        {
                                            state: { plan }
                                        }
                                    )
                                }
                            >
                            Edit Membership
                        </button>

                        </div>
            )
                )}

        </div>

        </div >
    );




}

export default MembershipManagement;