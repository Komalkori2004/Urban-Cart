

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllproduct } from '../../redux/thunks/productThunks';
import Swal from 'sweetalert2'
import { deleteProduct } from '../../redux/thunks/productThunks';

import { toast } from 'sonner';

const AdminProducts = () => {


    const dispatch = useDispatch()
    const { products, loading, error } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getAllproduct())
    }, [dispatch])


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "this product will be deleted permanently ",
            icon: "warning",
            showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Delete it!",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(deleteProduct(id))
                        .then((res) => {
                            if (res.meta.requestStatus === "fulfilled") {
                                toast.success("product deleted sucessfully")
                            }
                            if (res.meta.requestStatus === "rejected") {
                                toast.error(res.payload)
                            }
                        })
                }

            })

    }




    // if (loading) {

    //     return <h2>
    //         Loading...
    //     </h2>;
    // }



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


                        <p>Stock:{product.stock}</p>


                        <button>

                            Edit

                        </button>



                        <button onClick={() => {
                            handleDelete(product._id)
                        }}>

                            Delete

                        </button>




                    </div>
                ))}



            </div>


        </>
    )
}

export default AdminProducts