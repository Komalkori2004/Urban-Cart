    import React from 'react'

    import { useDispatch, useSelector } from "react-redux"

    import { getCart, updateCart } from '../redux/thunks/cartThunks'
    import { useEffect } from 'react'





    const CartPage = () => {

        const dispatch = useDispatch()
        const { items, loading, error } = useSelector((state) => state.cart)
        // console.log("cart data", items)

        useEffect(() => {
            dispatch(getCart())
        }, [dispatch])

        // if (loading) {
        //     return <h2>Loading...</h2>
        // }
        if (error) {
            return <h2>{error}</h2>
        }
        return (
            <>


                <div>

                    <h1>My Cart</h1>

                    {
                        items?.map((item) => (

                            <div
                                key={item.product._id}
                            >

                                <img
                                    src={item.product.images[0]?.url}
                                    alt={item.product.title}
                                    width="120"
                                />

                                <h3>
                                    {item.product.title}
                                </h3>

                                <p>
                                    ₹ {item.product.price}
                                </p>

                                <button
                                    type="button"

                                    onClick={() =>
                                        dispatch(
                                            updateCart({

                                                productId:
                                                    item.product._id,

                                                action: "decrease"
                                            })
                                        )
                                    }

                                >
                                    -
                                </button>



                                <span>
                                    {item.quantity}
                                </span>



                                <button
                                    type="button"
                                    onClick={() =>
                                        dispatch(
                                            updateCart({

                                                productId:
                                                    item.product._id,

                                                action: "increase"
                                            })
                                        )
                                    }

                                >
                                    +
                                </button>

                            </div>
                        ))
                    }

                </div>



            </>
        )
    }

    export default CartPage