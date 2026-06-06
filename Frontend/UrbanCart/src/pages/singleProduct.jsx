
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getsingleProduct,getAllproduct } from '../redux/thunks/productThunks'
import { Link } from "react-router-dom"

import { useNavigate } from "react-router-dom"
import { addToCart } from "../redux/thunks/cartThunks"
import "../style/singleProduct.css"


const SingleProduct = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { slug } = useParams()

    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState("")

    const { singleProduct, products,loading, error } = useSelector((state) => state.products)
    useEffect(() => {
        dispatch(getsingleProduct(slug))
        dispatch(getAllproduct())

    }, [slug, dispatch])


    const incressQty = () => {

        if (quantity < singleProduct.stock) {
            setQuantity(quantity + 1)
        }
    }
    const decressQty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                productId: singleProduct._id,
                quantity
            })
        )
        navigate("/cart")
    }

    const relatedProducts= products.filter((product)=>

        product.category===singleProduct.category &&
        product._id!==singleProduct._id 

        
    ).slice(0,4)


    useEffect(() => {
        setQuantity(1)

        if (singleProduct?.images?.length > 0) {
            setActiveImage(singleProduct.images[0].url)

        }
    }, [singleProduct])

    // if (loading) {
    //     return <h2>Loading...</h2>
    // }
    // if (error) {
    //     return <h2>{error}</h2>
    // }

    return (
        <>

            <div className="single-product-container">

                <div className="single-product-image">

                    <div className="thumbnail-list">

                        {singleProduct.images?.map((image) => (

                            <img
                                key={image.public_id}
                                src={image.url}
                                alt="thumbnail"
                                className={
                                    activeImage === image.url
                                        ? "active-thumb"
                                        : ""
                                }
                                onClick={() =>
                                    setActiveImage(image.url)
                                }
                            />

                        ))}

                    </div>  

                    <div className="main-image">

                        <img
                            src={activeImage}
                            alt={singleProduct.name}
                        />

                    </div>

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
                                    ? "Available"
                                    : "out-stock"
                            }
                        >
                            {
                                singleProduct.stock > 0
                                    ? `${singleProduct.stock} Available`
                                    : "Out Of Stock"
                            }
                        </span>

                    </div>

                    <div className="quantity-box">
                        <button onClick={decressQty}>-</button>
                        <span>{quantity}</span>
                        <button onClick={incressQty}>+</button>
                    </div>



                    <div className="product-actions">


                        <button className="add-cart-btn"
                            onClick={handleAddToCart}
                        >
                            Add To Cart
                        </button>

                        <button className="buy-now-btn" >
                            Buy Now
                        </button>

                    </div>

                </div>

            </div>

            <div className="related-products">

    <h2>
        You May Also Like
    </h2>

    <div className="related-grid">

        {relatedProducts.map((product) => (

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






        </>)
}

export default SingleProduct