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

import "./style/MembershipStats.css"

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

    <div className="admin-membership-stats-page">

        <div className="admin-membership-stats-header">

            <span className="admin-membership-stats-tag">
                👑 UrbanCart Admin
            </span>

            <h1>
                Membership Statistics
            </h1>

            <p>
                Monitor membership growth, revenue and customer activity from
                your premium dashboard.
            </p>

        </div>

        <div className="admin-membership-stats-grid">

            <div className="admin-membership-stat-card">

                <div className="admin-membership-stat-icon">

                    <FaCrown />

                </div>

                <h4>
                    Total Memberships
                </h4>

                <h2>
                    {membershipStats?.totalMemberships}
                </h2>

            </div>


            <div className="admin-membership-stat-card">

                <div className="admin-membership-stat-icon active">

                    <FaCheckCircle />

                </div>

                <h4>
                    Active Memberships
                </h4>

                <h2>

                    {membershipStats?.activeMemberships}

                </h2>

            </div>


            <div className="admin-membership-stat-card">

                <div className="admin-membership-stat-icon cancelled">

                    <FaTimesCircle />

                </div>

                <h4>
                    Cancelled Memberships
                </h4>

                <h2>

                    {membershipStats?.cancelledMemberships}

                </h2>

            </div>


            <div className="admin-membership-stat-card">

                <div className="admin-membership-stat-icon expired">

                    <FaClock />

                </div>

                <h4>
                    Expired Memberships
                </h4>

                <h2>

                    {membershipStats?.expiredMemberships}

                </h2>

            </div>


            <div className="admin-membership-stat-card revenue-card">

                <div className="admin-membership-stat-icon revenue">

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