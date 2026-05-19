import { useEffect, useState } from "react"
import { getAllproduct } from "../redux/thunks/productThunks"

import { useDispatch, useSelector } from "react-redux"

const Product = () => {

    const dispatch = useDispatch()

    const { products, loading, error } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllproduct())
    }, [dispatch])

    console.log(products)

    if (loading) {
        return <h2>Loading....</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    return (<>


        <div>

            <h2>
                all Product
            </h2>

            {
                products.map((products) => (
                    <div key={products._id}>
                        <img src={products.images[0]?.url} alt={products.name} width={200} />
                        <h3>{products.name}</h3>
                        <p>{products.price}</p>
                    </div>
                ))
            }

        </div>
    </>)
}

export default Product