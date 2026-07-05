import React from "react";
import "../home/style/OfferBanner.css";

function OfferBanner() {
    return (
        <section className="offer-banner">

            <div className="container">

                <div className="offer-content">

                    <span className="offer-tag">
                        LIMITED TIME OFFER
                    </span>

                    <h2>
                        Get Up To ₹500 OFF
                    </h2>

                    <p className="offer-text">
                        Use coupon code
                        <strong> WELCOME10 </strong>
                        on your first purchase.
                    </p>

                    <button className="offer-btn">
                        Shop Collection
                    </button>
{/* 
                    <p className="offer-subtitle">
                        PREMIUM FASHION • EXCLUSIVE DEALS • SECURE SHOPPING
                    </p> */}

                </div>

            </div>

        </section>
    );
}

export default OfferBanner;