import React from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

function ProductCard({
    product,
    isWishlisted,
    onWishlist,
    onAddToCart
}) {

    return (

        <Link
            to={`/product/${product.slug}`}
            className="product-card"
        >

            {/* IMAGE */}

            <div className="product-image">

                <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                />

                <button
                    className="product-wishlist"
                    onClick={onWishlist}
                >
                    <FiHeart
                        color={
                            isWishlisted
                                ? "#D4AF37"
                                : "white"
                        }
                    />
                </button>

            </div>


            {/* CONTENT */}

        {/* CONTENT */}

<div className="product-content">

    <p className="product-brand">
        {product.brand || "UrbanCart Fashion"}
    </p>

    <h3 className="product-name">
        {product.name}
    </h3>

   {
    product.numReviews > 0 && (

        <div className="product-rating">

            <span className="stars">

                {"★".repeat(
                    Math.round(
                        product.ratings || 0
                    )
                )}

                {"☆".repeat(
                    5 - Math.round(
                        product.ratings || 0
                    )
                )}

            </span>

            <span className="rating-count">
                ({product.numReviews})
            </span>

        </div>

    )
}

    <div className="product-price-box">

        <h2 className="product-price">
            ₹ {product.price}
        </h2>

        <span className="old-price">

            ₹ {
                Math.floor(
                    product.price * 1.3
                )
            }

        </span>

    </div>

    <div className="product-features">

        <span>
            Premium Quality
        </span>

        <span>
            Fast Delivery
        </span>

    </div>

    <div className="stock-badge">

        {
            product.stock > 0
                ? "In Stock"
                : "Out of Stock"
        }

    </div>

    <div className="product-divider"></div>

    <button
        className="product-btn"
        onClick={onAddToCart}
    >
        Add To Cart
    </button>

</div>

        </Link>
    );
}

export default ProductCard;