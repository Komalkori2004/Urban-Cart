import React from "react";

const ProductReviews = ({ reviews }) => {
  return (
    <section className="reviews-section">

      <div className="container">

        <h2 className="reviews-title">
          Customer Reviews
        </h2>

        {
          reviews?.length > 0 ? (

            <div className="reviews-list">

              {
                reviews.map((review) => (

                  <div
                    className="review-card"
                    key={review._id}
                  >

                    <h4>{review.name}</h4>

                    <p>
                      {"⭐".repeat(review.rating)}
                    </p>

                    <p>
                      {review.comment}
                    </p>

                  </div>

                ))
              }

            </div>

          ) : (

            <p>No Reviews Yet</p>

          )
        }

      </div>

    </section>
  );
};

export default ProductReviews;