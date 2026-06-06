

import React from 'react'
import "../home/style/hero.css"

function Hero() {
    return (
        <>


            <section
                className="hero-section">

                <div
                    className="hero-content">
                    <span className="hero-badge">

                        Premium Collection 2026

                    </span>
                    <p
                        className="hero-subtitle">

                        ELEVATE YOUR STYLE

                    </p>



                    <h1>

                        Luxury Fashion
                        For Modern Elegance

                    </h1>



                    <p
                        className="hero-text">

                        Discover premium
                        collections crafted
                        for timeless style
                        and sophistication.

                    </p>



                    <div
                        className="hero-buttons">

                        <button>

                            Shop Now

                        </button>



                        <button
                            className="outline-btn">

                            View Collection

                        </button>

                    </div>

                </div>



                <div
                    className="hero-image">

                    <img

                        src="/images/hero1.avif"

                        alt="Luxury Fashion"

                    />

                </div>

            </section>
        </>
    )
}

export default Hero