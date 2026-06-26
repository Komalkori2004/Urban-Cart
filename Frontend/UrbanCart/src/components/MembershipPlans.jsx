import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllMembership , purchaseMembership} from "../redux/thunks/membershipThunk";

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
    console.log("MEMBERSHIP ORDER", membershipOrder);

    useEffect(() => {
        dispatch(getAllMembership());
    }, [dispatch]);

    console.log(membershipPlans);

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
                            </button>
                        </div>
                    )
                )
            }

        </div>
    );
}

export default MembershipPlans;