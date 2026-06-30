import React from "react";
import { useNavigate } from "react-router-dom";
import "../home/style/instagramGallery.css";

const galleryImages = [
    {
        image: "/images/gallery1.avif",
        category: "Fashion",
        title: "Luxury Fashion"
    },
    {
        image: "/images/gallery2.avif",
        category: "Beauty",
        title: "Beauty Collection"
    },
    {
        image: "/images/gallery3.avif",
        category: "Fashion",
        title: "Premium Style"
    },
    {
        image: "/images/gallery4.avif",
        category: "Accessories",
        title: "Luxury Accessories"
    },
    {
        image: "/images/gallery5.avif",
        category: "Fashion",
        title: "New Arrival"
    },
    {
        image: "/images/jwellery1.avif",
        category: "Jewellery",
        title: "Fine Jewellery"
    },
    {
        image: "/images/jwellery2.avif",
        category: "Jewellery",
        title: "Elegant Collection"
    },
    {
        image: "/images/jwellery3.avif",
        category: "Jewellery",
        title: "Exclusive Pieces"
    },
    {
        image: "/images/perfume1.avif",
        category: "Perfume",
        title: "Luxury Perfumes"
    }
];

function InstagramGallery() {

    const navigate = useNavigate();

    return (
        <section className="instagram-gallery">

            <div className="gallery-container">

                <div className="gallery-header">

                    <span className="gallery-tag">
                        FOLLOW OUR JOURNEY
                    </span>

                    <h2 className="gallery-title">
                        Inspired By Luxury,
                        Worn With Confidence
                    </h2>

                    <p>
                        Explore the UrbanCart aesthetic through
                        curated fashion moments and timeless style.
                    </p>

                </div>

                <div className="gallery-grid">

                    {galleryImages.map((item, index) => (

                        <div
                            key={index}
                            className={`gallery-item item-${index + 1}`}
                            onClick={() =>
                                navigate(
                                    `/shop?category=${encodeURIComponent(item.category)}`
                                )
                            }
                        >

                            <img
                                src={item.image}
                                alt={item.title}
                                loading="lazy"
                            />

                            <div className="gallery-overlay">

                                <span className="gallery-category">
                                    {item.category}
                                </span>

                                <h4>
                                    {item.title}
                                </h4>

                                <p>
                                    Shop Collection →
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

                <div className="gallery-footer">

                    <button>
                        Follow @UrbanCart →
                    </button>

                </div>

            </div>

        </section>
    );
}

export default InstagramGallery;