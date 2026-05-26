

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllproduct } from '../redux/thunks/productThunks';
import Swal from 'sweetalert2'
import { deleteProduct } from '../redux/thunks/productThunks';

import { toast } from 'sonner';
import { Link } from 'react-router-dom';


const AdminProducts = () => {


    const dispatch = useDispatch()
    const [deleteLoading, setDeleteLoading] = useState(null)
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
                    setDeleteLoading(id)
                    dispatch(deleteProduct(id))
                        .then((res) => {
                            setDeleteLoading(null)
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


    const getStockText = (stock) => {
        if (stock === 0) {
            return "Out of stock"
        }

        if (stock < 5) {
            return "low Stock"
        }
        return "In Stock"

    }


    const getStockClass = (stock) => {
        if (stock === 0) {
            return "out-stock"
        }
        if (stock < 5) {
            return "low-stock"
        }
        return "in-stock"

    }


    return (
        <>

            <div className="admin-products-page">

                <h1 className='admin-title'>
                    Admin Products
                </h1>


                {
                    products.length === 0 ? (

                        <div className='empty-products'>

                            <h2>
                                No Products Found
                            </h2>

                        </div>

                    ) : (

                        <div className='product-container'>


                            {
                                products.map((product) => (

                                    <div
                                        className='product-card'
                                        key={product._id}
                                    >

                                        <img
                                            src={product.images?.[0]?.url}
                                            alt={product.name}
                                            className='product-image'
                                        />



                                        <div className='product-info'>

                                            <h3>
                                                {product.name}
                                            </h3>


                                            <p className='product-brand'>
                                                {product.category}
                                            </p>


                                            <div className='price-section'>

                                                <span className='price'>
                                                    ₹{product.price}
                                                </span>

                                            </div>



                                            {/* <p className='stock'>

                                                Stock:
                                                {product.stock}

                                            </p> */}
                                            <p className={`stock ${getStockClass(product.stock)}`}>
                                                {getStockText(product.stock)}
                                                ({product.stock})
                                            </p>



                                            <div className='admin-btns'>

                                                <Link
                                                    to={`/admin/update-product/${product._id}`}
                                                >

                                                    <button
                                                        className='edit-btn'
                                                    >
                                                        Edit
                                                    </button>

                                                </Link>



                                                <button

                                                    className='delete-btn'
                                                    disabled={deleteLoading===product._id}

                                                    onClick={() => {
                                                        handleDelete(product._id)
                                                    }}
                                                >

                                                   {
                                                    deleteLoading===product._id ? "Deleting..." : "Delete"
                                                   }

                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>
                    )
                }

            </div>

        </>
    )
}

export default AdminProducts