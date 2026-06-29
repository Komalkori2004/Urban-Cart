

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllproduct } from '../redux/thunks/productThunks';
import Swal from 'sweetalert2'
import { deleteProduct } from '../redux/thunks/productThunks';

import { toast } from 'sonner';
import { Link } from 'react-router-dom';

import "./style/adminPro.css"


const AdminProducts = () => {


    const dispatch = useDispatch()
    const [deleteLoading, setDeleteLoading] = useState(null)
    const { products, loading, error } = useSelector((state) => state.products)

    useEffect(() => {

        if (products.length === 0) {
            dispatch(getAllproduct())
        }

    }, [dispatch, products.length])

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
        if (stock === 0) return "admin-out-stock";
        if (stock < 5) return "admin-low-stock";
        return "admin-in-stock";
    };

    return (
        <>

        <div className="admin-container">

            <div className="admin-products-page">

                <h1 className="admin-title">
                    Admin Products
                </h1>

                {
                    products.length === 0 ? (

                        <div className="admin-empty-products">

                            <h2>
                                No Products Found
                            </h2>

                        </div>

                    ) : (

                        <div className="admin-product-container">

                            {
                                products.map((product) => (

                                    <div
                                        className="admin-product-card"
                                        key={product._id}
                                    >

                                        <img
                                            src={product.images?.[0]?.url}
                                            alt={product.name}
                                            className="admin-product-image"
                                            loading="lazy"
                                        />

                                        <div className="admin-product-info">

                                            <h3>
                                                {product.name}
                                            </h3>

                                            <p className="admin-product-category">
                                                {product.category}
                                            </p>

                                            {
                                                product.brand && (
                                                    <p className="admin-product-brand">
                                                        {product.brand}
                                                    </p>
                                                )
                                            }

                                            <div className="admin-price-section">

                                                <span className="admin-price">
                                                    ₹{product.price}
                                                </span>

                                            </div>

                                            <p
                                                className={`admin-stock ${getStockClass(
                                                    product.stock
                                                )}`}
                                            >
                                                {getStockText(product.stock)}
                                                ({product.stock})
                                            </p>

                                            {
                                                product.shipping && (
                                                    <span className="admin-shipping-badge">
                                                        Free Shipping
                                                    </span>
                                                )
                                            }

                                            <div className="admin-btns">

                                                <Link
                                                    to={`/admin/update-product/${product._id}`}
                                                >

                                                    <button
                                                        className="admin-edit-btn"
                                                    >
                                                        Edit
                                                    </button>

                                                </Link>

                                                <button
                                                    className="admin-delete-btn"
                                                    disabled={
                                                        deleteLoading === product._id
                                                    }
                                                    onClick={() => {
                                                        handleDelete(product._id)
                                                    }}
                                                >

                                                    {
                                                        deleteLoading === product._id
                                                            ? "Deleting..."
                                                            : "Delete"
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
            </div>

        </>
    )
}

export default AdminProducts