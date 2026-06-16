

import "../home/style/testimonials.css";
function Testimonials() {
    const reviews = [
        {
            name: "Priya Sharma",
            text: "The quality exceeded my expectations. Packaging felt truly premium.",
        },
        {
            name: "Rahul Mehta",
            text: "Fast delivery and elegant products. Definitely shopping again.",
        },
        {
            name: "Ananya Kapoor",
            text: "UrbanCart gives a luxury shopping experience at every step.",
        },
    ];

    return (
        <section className="testimonials-section">
            <div className="container">
              <div className="testimonials-header">

  <span className="testimonials-tag">
    TESTIMONIALS
  </span>

  <h2 className="testimonials-title">
    What Our Customers Say
  </h2>

</div>

                <div className="testimonials-grid">

                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="testimonial-card"
                        >
                            <div className="stars">
                                ★★★★★
                            </div>

                            <p className="testimonial-text">
                                "{review.text}"
                            </p>

                            <h4>
                                {review.name}
                            </h4>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default Testimonials;