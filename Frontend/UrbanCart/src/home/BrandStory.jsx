
import "../home/style/Brandstory.css";
import { Link } from "react-router-dom";


function BrandStory() {
    return (
        <section className="brand-story">

            <div className="container">

                <div className="brand-story-grid">

                    <div className="brand-story-left">

                        <span className="story-tag">
                            OUR STORY
                        </span>

                        <h2>
                            Crafted For
                            <span> Modern Luxury</span>
                        </h2>

                        <p>
                            UrbanCart brings together premium
                            quality, timeless style, and
                            exceptional craftsmanship for
                            customers who value elegance in
                            every detail.
                        </p>
                        <Link to="/products" className="story-btn">
                            Explore Collection
                        </Link>

                    </div>

                    <div className="brand-story-right">

                        <div className="story-stat">
                            <h3>10K+</h3>
                            <p>Happy Customers</p>
                        </div>

                        <div className="story-stat">
                            <h3>50+</h3>
                            <p>Premium Products</p>
                        </div>

                        <div className="story-stat">
                            <h3>100%</h3>
                            <p>Authentic Quality</p>
                        </div>

                        <div className="story-stat">
                            <h3>24/7</h3>
                            <p>Customer Support</p>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default BrandStory;