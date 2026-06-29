

import React from 'react'
import "../home/style/hero.css"

function Hero() {
    return (
        <>


          <section className="hero-section">

    <div className="container hero-wrapper">

        {/* LEFT */}
        <div className="hero-content">

            <span className="hero-badge">
                NEW COLLECTION
            </span>

            <h1 className="hero-title">
                THE ART OF
                <span>Luxury</span>
            </h1>

            <p className="hero-text">
                Discover timeless elegance and premium quality
                in every detail. Elevate your style with UrbanCart.
            </p>

            <div className="hero-buttons">

                <button className="primary-btn">
                    Shop Now
                </button>

                <button className="secondary-btn">
                    Explore Collection
                </button>

            </div>

        <div className="hero-features">

    <div className="feature-item">
        <h4>Free Shipping</h4>
        <p>On all orders</p>
    </div>

    <div className="feature-item">
        <h4>Premium Quality</h4>
        <p>100% Original</p>
    </div>

    <div className="feature-item">
        <h4>Exclusive Benefits</h4>
        <p>For members</p>
    </div>

</div>

        </div>


        {/* RIGHT */}
       <div className="hero-showcase">

    <div className="hero-circle"></div>

    <div className="main-card">
        <img
            src="/images/bag.avif"
            alt=""
        />
    </div>

    <div className="bottom-items">

        <div className="mini-card">
            <img
                src="/images/perfume1.avif"
                alt=""
            />
        </div>

        <div className="mini-card">
            <img
                src="/images/jwellery2.avif"
                alt=""
            />
        </div>

    </div>

    <div className="discount-badge">
        <span>UP TO</span>
        <h2>30%</h2>
        <span>OFF</span>
    </div>

</div>

    </div>

</section>
        </>
    )
}

export default Hero