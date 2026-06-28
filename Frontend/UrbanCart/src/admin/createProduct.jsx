import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../redux/thunks/productThunks";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { getAllCategory } from '../redux/thunks/categoryThunks'
import "../admin/style/createProduct.css"

import { toast }
    from "sonner";


const CreateProduct = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [error, setError] = useState({})
    const { loading } = useSelector(state => state.products)
    const { categories } = useSelector((state) => state.category)
    useEffect(() => {
        dispatch(getAllCategory())
    }, [dispatch])

    console.log(categories)
    const [formData, setFormData] = useState({
        name: "",

        description: "",

        price: "",

        category: "",

        brand: "",

        stock: "",

        shipping: false
    })

    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([]);


    const validateForm = () => {

        let newError = {}
        if (!formData.name.trim()) {
            newError.name = "product name is required "
        }
        if (!formData.description.trim()) {
            newError.description = "product description is required "
        }
        if (formData.price <= 0) {
            newError.price = ' product price must be greater than 0'
        }
        if (!formData.category.trim()) {
            newError.category = "product category is required "
        }

        if (!formData.brand.trim()) {
            newError.brand = "Product brand is required "
        }
        if (formData.stock <= 0) {
            newError.stock = "Product stock must be greater than 0"
        }
        if (!images.length) {
            newError.images = "Product image is required "
        }
        setError(newError)

        return Object.keys(newError).length === 0
    }





    const handleChange = (e) => {

        const { name, value, type, checked }
            = e.target;

        setFormData({

            ...formData,

            [name]:

                type === "checkbox"
                    ? checked
                    : value
        });
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
        if (!validateForm()) { return }

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

        dispatch(createProduct(productData))

            .then((res) => {

                if (
                    res.meta.requestStatus
                    === "fulfilled"
                ) {

                    toast.success(
                        "Product Created Successfully"
                    );



                    setFormData({

                        name: "",

                        description: "",

                        price: "",

                        category: "",

                        brand: "",

                        stock: "",

                        shipping: false
                    });



                    setImages([]);

                    navigate("/admin/all-product")
                }
                // navigate("/admin/all-product")



                if (
                    res.meta.requestStatus
                    === "rejected"
                ) {

                    toast.error(
                        res.payload
                    );
                }
            });
    }


 return (
    <div className="admin-product-page">

        <div className="admin-container">

            <div className="product-header">

                <h1 className="product-title">
                    Create Product
                </h1>

                <p className="product-subtitle">
                    Add a new product to your UrbanCart store
                </p>

            </div>

            <div className="product-form-card">

                <form
                    className="product-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        className="product-input"
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    {
                        error.name &&
                        <p className="error-text">
                            {error.name}
                        </p>
                    }


                    <textarea
                        className="product-input product-textarea"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    {
                        error.description &&
                        <p className="error-text">
                            {error.description}
                        </p>
                    }


                    <input
                        className="product-input"
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    {
                        error.price &&
                        <p className="error-text">
                            {error.price}
                        </p>
                    }


                    <select
                        className="product-input"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Category
                        </option>

                        {
                            categories.map(
                                category => (

                                    <option
                                        key={category._id}
                                        value={category.name}
                                    >
                                        {category.name}
                                    </option>
                                )
                            )
                        }

                    </select>

                    {
                        error.category &&
                        <p className="error-text">
                            {error.category}
                        </p>
                    }


                    <input
                        className="product-input"
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />

                    {
                        error.brand &&
                        <p className="error-text">
                            {error.brand}
                        </p>
                    }


                    <input
                        className="product-input"
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                    />

                    {
                        error.stock &&
                        <p className="error-text">
                            {error.stock}
                        </p>
                    }


                    <label
                        className="shipping-check"
                    >

                        <input
                            type="checkbox"
                            name="shipping"
                            checked={
                                formData.shipping
                            }
                            onChange={
                                handleChange
                            }
                        />

                        Free Shipping

                    </label>


                    <input
                        className="product-input"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={
                            handleImageChange
                        }
                    />

                    {
                        error.images &&
                        <p className="error-text">
                            {error.images}
                        </p>
                    }


                    <div
                        className="preview-container"
                    >

                        {
                            previewImages.map(
                                (
                                    img,
                                    index
                                ) => (

                                    <img
                                        key={index}
                                        src={img}
                                        alt="preview"
                                        loading="lazy"
                                        className="preview-image"
                                    />
                                )
                            )
                        }

                    </div>


                    <button
                        className="product-submit-btn"
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Creating..."
                                : "Create Product"
                        }

                    </button>

                </form>

            </div>

        </div>

    </div>
);
}

export default CreateProduct