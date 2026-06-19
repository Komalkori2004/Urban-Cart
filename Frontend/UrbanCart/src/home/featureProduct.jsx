import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { getAllproduct } from '../redux/thunks/productThunks'
import { useNavigate } from 'react-router-dom'
import {
    FaHeart,
    FaShoppingBag
}

    from "react-icons/fa"

import "../home/style/featureProduct.css"
const FeatureProduct = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { products = [] } = useSelector((state) => state.products)
useEffect(() => {

    if(products.length === 0){
        dispatch(getAllproduct())
    }

}, [dispatch, products.length])
    return (
        <>

            <section
                className=
                "featured-products"
            >

    <div className="container">

                <div
                    className=
                    "featured-header"
                >

                    <p
                        className=
                        "featured-subtitle"
                    >

                        PREMIUM COLLECTION

                    </p>



                    <h2
                        className=
                        "featured-title"
                    >

                        Our Featured Products

                    </h2>



                    <p
                        className=
                        "featured-text"
                    >

                        Handpicked luxury
                        items crafted for
                        elegance, quality
                        and timeless style.

                    </p>

                </div>



                <div
                    className=
                    "products-grid"
                >

                    {
                        products
                            .slice(0, 4)
                            .map((product) => (

                                <div
                                    key={product._id}
                                    className="featured-card"
                                >

                                    <div className="featured-image">

                                        <img
                                            src={product.images?.[0]?.url}
                                            alt={product.name}
                                             loading="lazy"
                                        />

                                    </div>

                                    <div className="featured-content">

                                        <p className="featured-category">
                                            Luxury Collection
                                        </p>

                                        <h3>
                                            {product.name}
                                        </h3>

                                        <p className="featured-description">
                                            Crafted for timeless elegance
                                            and modern sophistication.
                                        </p>

                                        <div className="featured-footer">

                                            {/* <h2>
                                                ₹{product.price}
                                            </h2> */}

                                            <button
                                                className="explore-btn"
                                                onClick={() => navigate("/products")}
                                            >
                                                Explore Product →
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            ))
                    }

                </div>
                   </div>

            </section>

        </>
    )
}

export default FeatureProduct