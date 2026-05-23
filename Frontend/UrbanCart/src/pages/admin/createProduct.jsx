import React from 'react'
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/thunks/productThunks";
import { useState } from 'react';


const CreateProduct = () => {
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

                if (res.meta.requestStatus
                    === "fulfilled") {

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
                    />



                    <textarea

                        name="description"

                        placeholder="Description"

                        value={formData.description}

                        onChange={handleChange}
                    />



                    <input

                        type="number"

                        name="price"

                        placeholder="Price"

                        value={formData.price}

                        onChange={handleChange}
                    />



                    <input

                        type="text"

                        name="category"

                        placeholder="Category"

                        value={formData.category}

                        onChange={handleChange}
                    />



                    <input

                        type="text"

                        name="brand"

                        placeholder="Brand"

                        value={formData.brand}

                        onChange={handleChange}
                    />



                    <input

                        type="number"

                        name="stock"

                        placeholder="Stock"

                        value={formData.stock}

                        onChange={handleChange}
                    />



                    <label>

                        Shipping

                        <input

                            type="checkbox"

                            name="shipping"

                            checked={formData.shipping}

                            onChange={handleChange}
                        />

                    </label>



                    <input

                        type="file"

                        multiple

                        accept="image/*"

                        onChange={handleImageChange}
                    />



                    <button type="submit">

                        Create Product

                    </button>

                </form>

            </div>
        </>
    )
}

export default CreateProduct