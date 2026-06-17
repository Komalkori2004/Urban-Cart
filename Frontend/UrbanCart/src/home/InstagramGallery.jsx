
import React from "react";
import "../home/style/instagramGallery.css";
const galleryImages = [
  "/images/gallery1.avif",
  "/images/gallery2.avif",
  "/images/gallery3.avif",
   "/images/gallery4.avif",
  "/images/gallery5.avif",  
  "/images/jwellery1.avif",
   "/images/jwellery2.avif",
      "/images/jwellery3.avif",
      "/images/perfume1.avif",
];

function InstagramGallery() {
  return (
    <section className="instagram-gallery">

      <div className="gallery-container">

        <div className="gallery-header">

          <span>
            FOLLOW OUR JOURNEY
          </span>

          <h2>
            Inspired By Luxury,
            Worn With Confidence
          </h2>

          <p>
            Explore the UrbanCart aesthetic through
            curated fashion moments and timeless style.
          </p>

        </div>

        <div className="gallery-grid">

          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`gallery-item item-${index + 1}`}
            >
              <img
                src={image}
                alt="UrbanCart Gallery"
              />
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

