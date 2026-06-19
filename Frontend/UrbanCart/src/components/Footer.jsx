import React from "react";
import "./style/footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">

            <div className="container footer-container">

                <div className="footer-brand">

                    <img
                        src="/logo/nav-logo.png"
                        alt="UrbanCart"
                        className="footer-logo"
                          loading="lazy"
                    />

                    <p>
                        Elevating Everyday Luxury.
                    </p>

                    <span>
                        Fashion • Beauty • Lifestyle
                    </span>

                </div>

                <div className="footer-links">

                    <div className="footer-column">
                        <h3>Shop</h3>

                        <Link to="/products">Products</Link>
                        <Link to="/products">Categories</Link>
                        <Link to="/products">New Arrivals</Link>

                    </div>

                    <div className="footer-column">
                        <h3>Support</h3>

                        <Link to="/faq">FAQ</Link>
                        <Link to="/">Shipping</Link>
                        <Link to="/">Returns</Link>

                    </div>

                    <div className="footer-column">
                        <h3>Company</h3>

                        <Link to="/">About Us</Link>
                        <Link to="/">Contact</Link>

                    </div>

                    <div className="footer-column">
                        <h3>Legal</h3>

                        <Link to="/">Privacy Policy</Link>
                        <Link to="/">Terms & Conditions</Link>

                    </div>

                </div>

            </div>

            <div className="footer-bottom">

                <p>
                    © 2026 UrbanCart. All Rights Reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;

