import React from "react";
import { Link } from "react-router-dom";

const RelatedProducts = ({ products }) => {
  return (
    <section className="related-products-section">

      <div className="container">

        <div className="related-products">

          <h2>You May Also Like</h2>

          <div className="related-grid">

            {products.map((product) => (

              <Link
                key={product._id}
                to={`/product/${product.slug}`}
                className="related-card"
              >

                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                />

                <h3>{product.name}</h3>

                <p>₹ {product.price}</p>

              </Link>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default RelatedProducts;  