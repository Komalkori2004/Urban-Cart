import React, {
    useEffect
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    getMembershipStats
} from "../redux/thunks/membershipThunk";

function MembershipStats() {

    const dispatch =
        useDispatch();

    const {
        membershipStats,
        statsLoading,
        statsError
    } = useSelector(
        state =>
            state.membership
    );

    useEffect(() => {

        dispatch(
            getMembershipStats()
        );

    }, [dispatch]);

    if (statsLoading) {
        return (
            <h2>
                Loading...
            </h2>
        );
    }

    if (statsError) {
        return (
            <h2>
                {statsError}
            </h2>
        );
    }

    return (

        <div
            style={{
                padding: "40px"
            }}
        >

            <h1>
                Membership Stats
            </h1>

            <h3>
                Total Memberships :
                {
                    membershipStats
                        ?.totalMemberships
                }
            </h3>

            <h3>
                Active Memberships :
                {
                    membershipStats
                        ?.activeMemberships
                }
            </h3>

            <h3>
                Cancelled Memberships :
                {
                    membershipStats
                        ?.cancelledMemberships
                }
            </h3>

            <h3>
                Expired Memberships :
                {
                    membershipStats
                        ?.expiredMemberships
                }
            </h3>

            <h3>
                Total Revenue :
                ₹{
                    membershipStats
                        ?.totalRevenue
                }
            </h3>

        </div>
    );
}

export default MembershipStats;