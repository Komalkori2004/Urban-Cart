

import React from "react";
import { Link } from "react-router-dom";

function ProductCard({
    product,
    isWishlisted,
    onWishlist,
    onAddToCart
}) {

    return (
        <Link to={`/product/${product.slug}`}>
            <div
                className="product-card"
            >

                <div className="product-image-wrapper">

                    <img
                        src={product.images[0]?.url}
                        alt={product.name}
                         loading="lazy"
                        className="product-image"
                    />
                    <button
                        className="wishlist-btn"
                        onClick={onWishlist}
                    >
                        {isWishlisted ? "❤️" : "🤍"}
                    </button>

                </div>


                <div className="product-info">

                    <h3>{product.name}</h3>



                    <p className="product-brand">
                        {product.brand}
                    </p>



                    <div className="price-section">

                        <span className="price">
                            ₹ {product.price}
                        </span>


                        {/* 
                                              <span className="old-price">
                                                  ₹ 149999
                                              </span> */}

                    </div>



                    <p className="stock">

                        {
                            product.stock > 0
                                ? "In Stock"
                                : "Out Of Stock"
                        }

                    </p>

                    <button onClick={onAddToCart}>
                        Add To Cart
                    </button>

                </div>

            </div>
        </Link>
    );
}

export default React.memo(ProductCard);