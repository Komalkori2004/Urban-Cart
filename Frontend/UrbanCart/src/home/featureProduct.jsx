import React, { useEffect } from 'react'

import {  useSelector, useDispatch } from 'react-redux'
import { getAllproduct } from '../redux/thunks/productThunks'
import {
    FaHeart,
    FaShoppingBag
}

    from "react-icons/fa"

    import "./hero.css"
const FeatureProduct = () => {

    const dispatch = useDispatch()
    const { products = [] } = useSelector((state) => state.products)
    useEffect(() => {
        dispatch(getAllproduct())
    }, [dispatch])

    return (
        <>

            <section
                className=
                "featured-products"
            >

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

                                    className=
                                    "product-card"
                                >

                                    <div
                                        className=
                                        "product-badge"
                                    >

                                        BEST SELLER

                                    </div>



                                    <div
                                        className=
                                        "wishlist-icon"
                                    >

                                        <FaHeart />

                                    </div>



                                    <div
                                        className=
                                        "product-image"
                                    >

                                        <img

                                            src={product.images?.[0]?.url}

                                            alt=
                                            {product.name}

                                        />

                                    </div>



                                    <div
                                        className=
                                        "product-info"
                                    >

                                        <h3>

                                            {product.name}

                                        </h3>



                                        <p
                                            className=
                                            "product-category"
                                        >

                                            Luxury Collection

                                        </p>



                                        <p
                                            className=
                                            "product-description"
                                        >

                                            Crafted with
                                            premium quality
                                            and timeless
                                            elegance for
                                            modern lifestyle.

                                        </p>



                                        <div
                                            className=
                                            "product-features"
                                        >

                                            <span>

                                                Premium

                                            </span>



                                            <span>

                                                Trending

                                            </span>



                                            <span>

                                                Luxury

                                            </span>

                                        </div>



                                        <div
                                            className=
                                            "product-footer"
                                        >

                                            <h2>

                                                ₹
                                                {product.price}

                                            </h2>



                                            <button
                                                className=
                                                "cart-btn"
                                            >

                                                <FaShoppingBag />

                                                Add To Cart

                                            </button>

                                        </div>

                                    </div>

                                </div>
                            ))
                    }

                </div>

            </section>

        </>
    )
}

export default FeatureProduct