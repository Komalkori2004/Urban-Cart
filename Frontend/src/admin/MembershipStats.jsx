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

import {
    FaCrown,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaRupeeSign
} from "react-icons/fa";

import "./style/Adminmembership.css"

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

        <div className="membership-stats">

            <div className="stats-header">

                <h1>
                    Membership Stats
                </h1>

                <p>
                    Overview of membership performance
                    and revenue.
                </p>

            </div>

            <div className="stats-grid">

                <div className="stats-card">

                    <div className="stats-icon">
                        <FaCrown />
                    </div>

                    <h4>
                        Total Memberships
                    </h4>

                    <h2>
                        {membershipStats?.totalMemberships}
                    </h2>

                </div>

                <div className="stats-card">

                    <div className="stats-icon active-icon">
                        <FaCheckCircle />
                    </div>

                    <h4>
                        Active Memberships
                    </h4>

                    <h2>
                        {membershipStats?.activeMemberships}
                    </h2>

                </div>

                <div className="stats-card">

                    <div className="stats-icon cancelled-icon">
                        <FaTimesCircle />
                    </div>

                    <h4>
                        Cancelled Memberships
                    </h4>

                    <h2>
                        {membershipStats?.cancelledMemberships}
                    </h2>

                </div>
                <div className="stats-card">

                    <div className="stats-icon expired-icon">
                        <FaClock />
                    </div>

                    <h4>
                        Expired Memberships
                    </h4>

                    <h2>
                        {membershipStats?.expiredMemberships}
                    </h2>

                </div>
                <div className="stats-card revenue-card">

                    <div className="stats-icon revenue-icon">
                        <FaRupeeSign />
                    </div>

                    <h4>
                        Total Revenue
                    </h4>

                    <h2>
                        ₹{membershipStats?.totalRevenue}
                    </h2>

                </div>
            </div>

        </div>
    );
}

export default MembershipStats;