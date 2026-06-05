
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getsingleProduct } from '../redux/thunks/productThunks'

import {useNavigate} from "react-router-dom"

import "../style/singleProduct.css"


const SingleProduct = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { slug } = useParams()

    const { singleProduct, loading, error } = useSelector((state) => state.products)
    useEffect(() => {
        dispatch(getsingleProduct(slug))

    }, [slug, dispatch])




    if (loading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <>

            <div className="single-product-container">

                <div className="single-product-image">

                    <img
                        src={singleProduct.images?.[0]?.url}
                        alt={singleProduct.name}
                    />

                </div>

                <div className="single-product-content">

                    <p className="product-label">
                        Luxury Collection
                    </p>

                    <h1>
                        {singleProduct.name}
                    </h1>

                    <p className="product-brand">
                        {singleProduct.brand}
                    </p>

                    <h2 className="product-price">
                        ₹ {singleProduct.price}
                    </h2>

                    <p className="product-description">
                        {singleProduct.description}
                    </p>

                    <div className="product-meta">

                        <span>
                            Category:
                            {singleProduct.category}
                        </span>

                        <span
                            className={
                                singleProduct.stock > 0
                                    ? "in-stock"
                                    : "out-stock"
                            }
                        >
                            {
                                singleProduct.stock > 0
                                    ? "In Stock"
                                    : "Out Of Stock"
                            }
                        </span>

                    </div>

                    <div className="product-actions">

                        <button className="add-cart-btn">
                            Add To Cart
                        </button>

                        <button className="buy-now-btn" >
                            Buy Now
                        </button>

                    </div>

                </div>

            </div>






        </>)
}

export default SingleProduct