

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, } from 'react-router-dom'
import { getAllCategory } from '../redux/thunks/categoryThunks'

import { toast } from "sonner";

import { useDispatch, useSelector } from "react-redux";

import { getSingleProductById, updateProduct } from '../redux/thunks/productThunks';

import "./style/updateProduct.css"


function UpdateProduct() {

    const dispatch = useDispatch()
    const { id } = useParams()

    const navigate = useNavigate()

    const { singleProduct, loading, error } = useSelector((state) => state.products)

    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const { categories } = useSelector((state) => state.category)
    useEffect(() => {
        dispatch(getAllCategory())
    }, [dispatch])

    const [formData,
        setFormData] = useState({

            name: "",

            description: "",

            price: "",

            category: "",

            brand: "",

            stock: "",

            shipping: false
        });


    useEffect(() => {

        dispatch(getSingleProductById(id))
    }, [id, dispatch])


    useEffect(() => {

        if (singleProduct) {

            setFormData({

                name:
                    singleProduct.name || "",

                description:
                    singleProduct.description || "",

                price:
                    singleProduct.price || "",

                category:
                    singleProduct.category || "",

                brand:
                    singleProduct.brand || "",

                stock:
                    singleProduct.stock || "",

                shipping:
                    singleProduct.shipping || false
            });
        }

    }, [singleProduct]);

    // 


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        })
    }

    const handleImageChange = (e) => {

        const files = Array.from(e.target.files)
        setImages(files)
        const preview = files.map((file) =>
            URL.createObjectURL(file)

        )
        setPreviewImages(preview)


    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const productData = new FormData()

        productData.append("name", formData.name)
        productData.append("description", formData.description)
        productData.append("price", formData.price)
        productData.append("category", formData.category)
        productData.append("brand", formData.brand)
        productData.append("stock", formData.stock)
        productData.append("shipping", formData.shipping)
        images.forEach((image) => {
            productData.append("images", image)
        })



        dispatch(updateProduct({ productData, id }))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    toast.success("product updated sucessfully")
                    navigate("/admin/all-product")
                }
                if (res.meta.requestStatus === "rejected") {
                    toast.error(res.payload)
                }
            })

    }

    return (
    <>

        <div className="admin-container">

            <div className="update-product-page">

                {/* Header */}

                <div className="update-header">

                    {/* <p className="update-subtitle">
                        ADMIN PANEL
                    </p> */}

                    <h1 className="update-title">
                        Update Product
                    </h1>

                    <p className="update-desc">
                        Modify product information, pricing,
                        inventory and images.
                    </p>

                </div>

                <form
                    className="update-product-form"
                    onSubmit={handleSubmit}
                >

                    {/* Product Information */}

                    <div className="form-section">

                        <h3>
                            Product Information
                        </h3>

                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <textarea
                            name="description"
                            placeholder="Product Description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={6}
                        />

                    </div>


                    {/* Category + Brand */}

                    <div className="form-section">

                        <h3>
                            Category & Brand
                        </h3>

                        <div className="form-grid">

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {
                                    categories.map((category) => (

                                        <option
                                            key={category._id}
                                            value={category.name}
                                        >
                                            {category.name}
                                        </option>

                                    ))
                                }

                            </select>

                            <input
                                type="text"
                                name="brand"
                                placeholder="Brand Name"
                                value={formData.brand}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* Price + Stock */}

                    <div className="form-section">

                        <h3>
                            Pricing & Inventory
                        </h3>

                        <div className="form-grid">

                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="stock"
                                placeholder="Stock"
                                value={formData.stock}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* Shipping */}

                    <div className="form-section">

                        <h3>
                            Shipping
                        </h3>

                        <label className="shipping-label">

                            <input
                                type="checkbox"
                                name="shipping"
                                checked={formData.shipping}
                                onChange={handleChange}
                            />

                            Free Shipping Available

                        </label>

                    </div>


                    {/* Images */}

                    <div className="form-section">

                        <h3>
                            Product Images
                        </h3>

                        <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                        />

                        <div className="preview-container">

                            {
                                previewImages.length > 0

                                    ?

                                    previewImages.map((img, index) => (

                                        <img
                                            key={index}
                                            src={img}
                                            alt="preview"
                                            className="preview-image"
                                            loading="lazy"
                                        />

                                    ))

                                    :

                                    singleProduct?.images?.map((img, index) => (

                                        <img
                                            key={index}
                                            src={img.url}
                                            alt="old-product"
                                            className="preview-image"
                                            loading="lazy"
                                        />

                                    ))
                            }

                        </div>

                    </div>


                    {/* Product Summary */}

                    <div className="form-section product-summary">

                        <h3>
                            Product Summary
                        </h3>

                        <div className="summary-item">

                            <span>
                                Category
                            </span>

                            <strong>
                                {formData.category || "-"}
                            </strong>

                        </div>

                        <div className="summary-item">

                            <span>
                                Brand
                            </span>

                            <strong>
                                {formData.brand || "-"}
                            </strong>

                        </div>

                        <div className="summary-item">

                            <span>
                                Price
                            </span>

                            <strong>
                                ₹{formData.price || 0}
                            </strong>

                        </div>

                        <div className="summary-item">

                            <span>
                                Stock
                            </span>

                            <strong>
                                {formData.stock || 0}
                            </strong>

                        </div>

                        <div className="summary-item">

                            <span>
                                Shipping
                            </span>

                            <strong>
                                {
                                    formData.shipping
                                        ? "Available"
                                        : "Unavailable"
                                }
                            </strong>

                        </div>

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        className="update-btn"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Updating Product..."
                                : "Update Product"
                        }

                    </button>

                </form>

            </div>

        </div>

    </>
)
}

export default UpdateProduct