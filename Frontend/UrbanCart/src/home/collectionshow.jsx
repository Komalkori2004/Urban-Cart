import "../home/style/collectionShow.css"




function CollectionShowcase() {
  return (
    <section className="collection-showcase">
      <div className="collection-container">

        <div className="collection-content">

          <span className="collection-label">
            NEW SEASON COLLECTION
          </span>

          <h2>
            Crafted For
            <span> Modern Luxury</span>
          </h2>

          <p>
            Discover premium essentials curated for
            individuals who appreciate timeless design,
            superior craftsmanship, and elevated style.
          </p>

          <button className="collection-btn">
            Explore Collection
          </button>

        </div>

        <div className="collection-image">
          <img
            src="/images/showcase2.avif"
            alt="UrbanCart Luxury Collection"
             loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}

export default CollectionShowcase;

