
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiHome,
    FiShoppingBag,
    FiMail,
    FiCreditCard,
    FiUser
} from "react-icons/fi";
import "./style/notFound.css"

const NotFound = () => {
    const navigate = useNavigate();

    return (

        <div className="notfound-page">

            <div className="container">

                <div className="notfound-wrapper">

                    {/* Logo */}

                    <img
                        src="/logo/nav-logo.png"
                        alt="UrbanCart"
                        className="notfound-logo"
                    />

                    {/* 404 */}

                    <span className="notfound-code">
                        404
                    </span>

                    <span className="notfound-subtitle">
                        LOST IN LUXURY
                    </span>

                    <h1 className="notfound-title">
                        Oops! Page Not Found
                    </h1>

                    <p className="notfound-description">

                        The page you're looking for doesn't exist,
                        may have been moved, or the link is no longer available.

                    </p>

                    {/* Buttons */}

                    <div className="notfound-actions">

                        <Link
                            to="/products"
                            className="notfound-primary-btn"
                        >
                            Continue Shopping →
                        </Link>

                        <button
                            className="notfound-secondary-btn"
                            onClick={() => navigate(-1)}
                        >
                            ← Go Back
                        </button>

                    </div>

                    <div className="notfound-divider">

                        <span></span>

                    </div>

                    {/* Quick Links */}

                    <div className="notfound-links">

                        <Link
                            to="/"
                            className="notfound-link-card"
                        >
                            <FiHome />
                            Home
                        </Link>

                        <Link
                            to="/products"
                            className="notfound-link-card"
                        >
                            <FiShoppingBag />
                            Shop
                        </Link>

                        <Link
                            to="/dashboard"
                            className="notfound-link-card"
                        >
                            <FiUser />
                            My Account
                        </Link>

                        <Link
                            to="/#contact"
                            className="notfound-link-card"
                        >
                            <FiMail />
                            Contact
                        </Link>

                    </div>

                    {/* Bottom */}

                    <div className="notfound-footer">

                        <h4>

                            Need Help?

                        </h4>

                        <p>

                            Return to the homepage or continue
                            exploring UrbanCart's premium collection.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );
}



export default NotFound;
