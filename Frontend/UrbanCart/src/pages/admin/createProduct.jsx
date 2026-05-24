import React from 'react'
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/thunks/productThunks";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { toast }
    from "sonner";


const CreateProduct = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
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
        setImages(Array.from(e.target.files))

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
        <>
            <div>

                <h1>
                    Create Product
                </h1>



                <form
                    onSubmit={handleSubmit}
                >

                    <input

                        type="text"

                        name="name"

                        placeholder="Product Name"

                        value={formData.name}

                        onChange={handleChange}
                    /><br />



                    <textarea

                        name="description"

                        placeholder="Description"

                        value={formData.description}

                        onChange={handleChange}
                    /><br />



                    <input

                        type="number"

                        name="price"

                        placeholder="Price"

                        value={formData.price}

                        onChange={handleChange}
                    /><br />



                    <input

                        type="text"

                        name="category"

                        placeholder="Category"

                        value={formData.category}

                        onChange={handleChange}
                    /><br />



                    <input

                        type="text"

                        name="brand"

                        placeholder="Brand"

                        value={formData.brand}

                        onChange={handleChange}
                    /><br />



                    <input

                        type="number"

                        name="stock"

                        placeholder="Stock"

                        value={formData.stock}

                        onChange={handleChange}
                    /><br />



                    <label>

                        Shipping

                        <input

                            type="checkbox"

                            name="shipping"

                            checked={formData.shipping}

                            onChange={handleChange}
                        />

                    </label><br />



                    <input

                        type="file"

                        multiple

                        accept="image/*"

                        onChange={handleImageChange}
                    /><br />



                    <button type="submit">

                        Create Product

                    </button>

                </form>

            </div>
        </>
    )
}

export default CreateProduct