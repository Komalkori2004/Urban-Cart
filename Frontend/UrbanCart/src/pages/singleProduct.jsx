
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getsingleProduct } from '../redux/thunks/productThunks'


const SingleProduct = () => {

    const dispatch = useDispatch()
    const {slug} = useParams()

    const { singleProduct, loading, error } = useSelector((state) => state.products)
    useEffect(() => {
        dispatch(getsingleProduct(slug))

    }, [slug, dispatch])

    console.log(singleProduct);


    if (loading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <>

            <div className="single-product">
                <img src={singleProduct.images?.[0]?.url} alt={singleProduct.name} width={400} />

                <div>

                    <h2>{singleProduct.name}</h2>
                    <p>{singleProduct.description}</p>
                    <h3>${singleProduct.price}</h3>
                    <p>{singleProduct.category}</p>
                    <p>
                        Brand:
                        {singleProduct?.brand}
                    </p>

                    <p>
                        Stock:
                        {singleProduct?.stock}
                    </p>

<button>Add to Cart</button>


                </div>






            </div>






        </>)
}

export default SingleProduct