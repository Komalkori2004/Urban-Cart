import React from "react";

import "../style/ProfileSettings.css";
import { useSelector } from "react-redux";

const ProfileSettings = () => {
    const { user } = useSelector((state) => state.auth);


return (
    <div className="ps-page">

        <div className="container">

            {/* ================= Hero ================= */}

            <section className="ps-hero">

                <div className="ps-hero-content">

                    <span className="ps-badge">
                        ACCOUNT SETTINGS
                    </span>

                    <h1 className="ps-title">
                        Profile Settings
                    </h1>

                    <p className="ps-description">
                        Manage your personal information, profile picture and account security from one place.
                    </p>

                </div>

            </section>

            {/* ================= Profile Picture ================= */}

            <section className="ps-avatar-card">

                <div className="ps-avatar-wrapper">

                    <div className="ps-avatar">

                        {user?.avatar?.url ? (

                            <img
                                src={user.avatar.url}
                                alt={user.name}
                            />

                        ) : (

                            <div className="ps-avatar-placeholder">

                                {user?.name?.charAt(0).toUpperCase()}

                            </div>

                        )}

                    </div>

                    <div className="ps-user-info">

                        <h2 className="ps-name">
                            {user?.name}
                        </h2>

                        <p className="ps-email">
                            {user?.email}
                        </p>

                        <span className="ps-verified">
                            ✓ Verified Account
                        </span>

                    </div>

                </div>

                <button className="ps-btn">
                    Change Profile Photo
                </button>

            </section>

            {/* ================= Personal Information ================= */}

            <section className="ps-card">

                <div className="ps-card-header">

                    <h2>
                        Personal Information
                    </h2>

                    <p>
                        Update your account details.
                    </p>

                </div>

                <div className="ps-grid">

                    <div className="ps-group">

                        <label className="ps-label">
                            Full Name
                        </label>

                        <input
                            className="ps-input"
                            type="text"
                            value={user?.name || ""}
                        />

                    </div>

                    <div className="ps-group">

                        <label className="ps-label">
                            Email Address
                        </label>

                        <input
                            className="ps-input"
                            type="email"
                            value={user?.email || ""}
                            disabled
                        />

                    </div>

                    <div className="ps-group">

                        <label className="ps-label">
                            Phone Number
                        </label>

                        <input
                            className="ps-input"
                            type="text"
                            value={user?.phone || ""}
                        />

                    </div>

                    <div className="ps-group">

                        <label className="ps-label">
                            Gender
                        </label>

                        <select
                            className="ps-select"
                            value={user?.gender || ""}
                        >

                            <option value="">
                                Select Gender
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Female">
                                Female
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>

                    <div className="ps-group ps-full">

                        <label className="ps-label">
                            Date of Birth
                        </label>

                        <input
                            className="ps-input"
                            type="date"
                            value={
                                user?.dateOfBirth
                                    ? user.dateOfBirth.split("T")[0]
                                    : ""
                            }
                        />

                    </div>

                </div>

                <div className="ps-footer">

                    <button className="ps-btn">
                        Save Changes
                    </button>

                </div>

            </section>

            {/* ================= Security ================= */}

            <section className="ps-card">

                <div className="ps-card-header">

                    <h2>
                        Security
                    </h2>

                    <p>
                        Update your password regularly to keep your account secure.
                    </p>

                </div>

                <div className="ps-security-grid">

                    <div className="ps-group">

                        <label className="ps-label">
                            Current Password
                        </label>

                        <input
                            className="ps-input"
                            type="password"
                            placeholder="Enter current password"
                        />

                    </div>

                    <div className="ps-group">

                        <label className="ps-label">
                            New Password
                        </label>

                        <input
                            className="ps-input"
                            type="password"
                            placeholder="Enter new password"
                        />

                    </div>

                    <div className="ps-group">

                        <label className="ps-label">
                            Confirm Password
                        </label>

                        <input
                            className="ps-input"
                            type="password"
                            placeholder="Confirm new password"
                        />

                    </div>

                </div>

                <div className="ps-footer">

                    <button className="ps-btn">
                        Change Password
                    </button>

                </div>

            </section>

        </div>

    </div>
);
};

export default ProfileSettings;