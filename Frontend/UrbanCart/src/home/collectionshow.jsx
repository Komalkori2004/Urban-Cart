import "../home/style/collectionShow.css"





function CollectionShowcase() {
  return (
    <section className="collection-showcase">

      <div className="container">

        <div className="collection-wrapper">

          {/* IMAGE */}

          <div className="collection-image-section">

            <img
              src="/images/showcase2.avif"
              alt="Luxury Collection"
              className="collection-main-image"
              loading="lazy"
            />

            <div className="collection-badge">
              NEW
            </div>

          </div>

          {/* CONTENT */}

          <div className="collection-content">

            <span className="collection-label">
              NEW SEASON COLLECTION
            </span>

            <h2 className="collection-title">
              Crafted For
              <span> Modern Luxury</span>
            </h2>

            <p className="collection-description">
              Discover premium essentials curated for
              individuals who appreciate timeless
              design, superior craftsmanship,
              and elevated style.
            </p>

           <div className="collection-features">

    <div className="feature">
        <span>✓</span>
        Premium Craftsmanship
    </div>

    <div className="feature">
        <span>✓</span>
        Exclusive Collections
    </div>

    <div className="feature">
        <span>✓</span>
        Luxury Experience
    </div>

</div>

            <button className="collection-btn">
              Explore Collection
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CollectionShowcase;

