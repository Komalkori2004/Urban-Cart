import React from "react";
import "./style/footer.css";
import {
    FaInstagram,
    FaPinterestP,
    FaFacebookF
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {

    return (

        <footer className="footer">

            <div className="container">

                {/* Brand */}

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
                <div className="footer-divider"></div>


                {/* Links */}

                <div className="footer-links">

                    <div className="footer-column">

                        <h3>Shop</h3>

                        <Link to="/products">
                            Products
                        </Link>

                        <Link to="/products">
                            Categories
                        </Link>

                        <Link to="/products">
                            New Arrivals
                        </Link>

                    </div>


                    <div className="footer-column">

                        <h3>Company</h3>

                        <Link to="/">
                            About Us
                        </Link>

                        <Link to="/contact">
                            Contact
                        </Link>

                    </div>


                    <div className="footer-column">

                        <h3>Support</h3>

                        <Link to="/faq">
                            FAQ
                        </Link>

                        <Link to="/">
                            Shipping
                        </Link>

                        <Link to="/">
                            Returns
                        </Link>

                    </div>

                </div>


                {/* Social */}

                <div className="footer-social">

                    <a
                        href="#"
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </a>

                    <a
                        href="#"
                        aria-label="Pinterest"
                    >
                        <FaPinterestP />
                    </a>

                    <a
                        href="#"
                        aria-label="Facebook"
                    >
                        <FaFacebookF />
                    </a>

                </div>

            </div>


            {/* Bottom */}

            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()}
                    {" "}
                    UrbanCart.
                    All Rights Reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;