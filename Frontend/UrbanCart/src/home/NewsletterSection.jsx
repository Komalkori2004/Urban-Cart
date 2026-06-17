

import "../home/style/NewsletterSection.css";

function NewsletterSection() {
  return (
    <section className="newsletter">
      <div className="container">

        <div className="newsletter-card">

          <span className="newsletter-tag">
            EXCLUSIVE ACCESS
          </span>

          <h2>
            Become An Insider
          </h2>

          <p>
            Join the UrbanCart circle and receive early
            access to new collections, private offers,
            luxury drops, and curated style inspiration.
          </p>

          <form className="newsletter-form">

            <input
              type="email"
              placeholder="Enter your email address"
            />

            <button type="submit">
              Join The Circle →
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default NewsletterSection;

