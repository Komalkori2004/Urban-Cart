import React from "react";

const ProductReviewForm = ({
  rating,
  setRating,
  comment,
  setComment,
  handleReviewSubmit,
  reviewLoading
}) => {
  return (
    <div className="review-form">

      <h3>Write A Review</h3>

      <div className="rating-select">

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="0">Select Rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>

      </div>

      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button onClick={handleReviewSubmit}>
        {reviewLoading ? "Submitting..." : "Submit Review"}
      </button>

    </div>
  );
};

export default ProductReviewForm;