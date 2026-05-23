

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllproduct } from '../../redux/thunks/productThunks';

const AdminProducts = () => {


    const dispatch = useDispatch()
    const { products, loading, error } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getAllproduct())
    }, [dispatch])

    if (loading) {

        return <h2>
            Loading...
        </h2>;
    }



    if (error) {

        return <h2>
            {error}
        </h2>;
    }


    return (
        <>

            <div>

                <h1>Admin Products</h1>

                {products.map((product) => (
                    <div key={product._id}>
                        <img src={product.images?.[0]?.url} alt={product.name} width={120} />


                        h3{product.name}
                        <p>{product.description}</p>
                        <p>₹{product.price}</p>


                        <p>Stock:{product.state}</p>


                        <button>

                            Edit

                        </button>



                        <button>

                            Delete

                        </button>




                    </div>
                ))}



            </div>


        </>
    )
}

export default AdminProducts