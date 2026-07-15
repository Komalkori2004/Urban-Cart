import React, { useEffect, useState, useRef, } from "react";
import { updateProfile, changePassword, uploadProfileImage } from "../redux/thunks/authThunks";
import { toast } from "sonner";
import "../style/ProfileSettings.css";
import { useDispatch, useSelector } from "react-redux";

const ProfileSettings = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const { user, loading } = useSelector((state) => state.auth);
    const [profileData, setProfileData] = useState({
        name: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [selectedImage, setSelectedImage] = useState(null);

    const [previewImage, setPreviewImage] = useState(
        user?.avatar?.url || ""
    );

    useEffect(() => {

        if (user) {

            setProfileData({
                name: user.name || "",
                phone: user.phone || "",
                gender: user.gender || "",
                dateOfBirth: user.dateOfBirth
                    ? user.dateOfBirth.split("T")[0]
                    : "",
            });

            setPreviewImage(
                user.avatar?.url || ""
            );

        }

    }, [user]);

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setSelectedImage(file);

        setPreviewImage(
            URL.createObjectURL(file)
        );

    };


    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };
    const handleProfileUpdate = async (e) => {

        e.preventDefault();

        const result = await dispatch(
            updateProfile(profileData)
        );

        if (
            result.meta.requestStatus === "fulfilled"
        ) {

            toast.success(
                result.payload.message
            );

        }

        if (
            result.meta.requestStatus === "rejected"
        ) {

            toast.error(
                result.payload
            );

        }


    };

    const handlePasswordChange = (e) => {

        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });

    };


    const handlePasswordSubmit = async (e) => {

        e.preventDefault();

        const result = await dispatch(
            changePassword(passwordData)
        );

        if (
            result.meta.requestStatus === "fulfilled"
        ) {

            toast.success(
                result.payload.message
            );

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

        }

        if (
            result.meta.requestStatus === "rejected"
        ) {

            toast.error(
                result.payload
            );

        }

    };



    const handleImageUpload = async () => {

        console.log("Upload clicked");

        console.log(selectedImage);

        if (!selectedImage) {

            toast.error(
                "Please select an image"
            );

            return;

        }

        const formData = new FormData();

        formData.append(
            "avatar",
            selectedImage
        );

        const result = await dispatch(
            uploadProfileImage(formData)
        );

        if (
            result.meta.requestStatus ===
            "fulfilled"
        ) {

            toast.success(
                result.payload.message
            );

            setSelectedImage(null);

        }

        if (
            result.meta.requestStatus ===
            "rejected"
        ) {

            toast.error(
                result.payload
            );

        }

    };


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

                            {previewImage ? (

                                <img
                                    src={previewImage}
                                    alt={user?.name}
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

                    <button
                        type="button"
                        className="ps-btn"
                        onClick={() => fileInputRef.current.click()}
                    >
                        Change Photo
                    </button>

                    {
                        selectedImage && (

                            <button
                                type="button"
                                className="ps-btn"
                                onClick={handleImageUpload}
                            >
                                Upload Photo
                            </button>

                        )
                    }

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                    />

                </section>

                {/* ================= Personal Information ================= */}

                <form
                    className="ps-card"
                    onSubmit={handleProfileUpdate}
                >

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
                                name="name"
                                value={profileData.name}
                                onChange={handleChange}
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
                                name="phone"
                                value={profileData.phone}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="ps-group">

                            <label className="ps-label">
                                Gender
                            </label>

                            <select
                                className="ps-select"
                                name="gender"
                                value={profileData.gender}
                                onChange={handleChange}
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
                                name="dateOfBirth"
                                value={profileData.dateOfBirth}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="ps-footer">
                        <button
                            type="submit"
                            className="ps-btn"
                            disabled={loading}
                        >

                            {
                                loading
                                    ? "Updating..."
                                    : "Save Changes"
                            }

                        </button>
                    </div>

                </form>

                {/* ================= Security ================= */}

                <form
                    className="ps-card"
                    onSubmit={handlePasswordSubmit}
                >

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
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
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
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
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
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                placeholder="Confirm new password"
                            />

                        </div>

                    </div>

                    <div className="ps-footer">
                        <button
                            type="submit"
                            className="ps-btn"
                            disabled={loading}
                        >
                            {
                                loading
                                    ? "Changing..."
                                    : "Change Password"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default ProfileSettings;