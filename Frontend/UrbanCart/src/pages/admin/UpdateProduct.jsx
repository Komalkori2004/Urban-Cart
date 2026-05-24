

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, } from 'react-router-dom'

import { toast }
    from "sonner";

import {

    useDispatch,

    useSelector

} from "react-redux";

import { getSingleProductById, updateProduct } from '../../redux/thunks/productThunks';


function UpdateProduct() {

    const dispatch = useDispatch()
    const { id } = useParams()

    const navigate = useNavigate()

    const { singleProduct, loading, error } = useSelector((state) => state.products)

    const [images, setImages] = useState([]);

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


            <div>

                <h1>
                    Update Product
                </h1>



                <form
                    onSubmit={handleSubmit}
                >

                    <input

                        type="text"

                        name="name"

                        value={formData.name}

                        onChange={handleChange}
                    />



                    <textarea

                        name="description"

                        value={
                            formData.description
                        }

                        onChange={handleChange}
                    /><br />



                    <input

                        type="number"

                        name="price"

                        value={formData.price}

                        onChange={handleChange}
                    /><br />



                    <input

                        type="text"

                        name="category"

                        value={formData.category}

                        onChange={handleChange}
                    /><br />



                    <input

                        type="text"

                        name="brand"

                        value={formData.brand}

                        onChange={handleChange}
                    /><br />



                    <input

                        type="number"

                        name="stock"

                        value={formData.stock}

                        onChange={handleChange}
                    /><br />



                    <label>

                        Shipping

                        <input

                            type="checkbox"

                            name="shipping"

                            checked={
                                formData.shipping
                            }

                            onChange={handleChange}
                        />

                    </label><br />
                    <input

                        type="file"

                        multiple

                        onChange={
                            handleImageChange
                        }
                    /><br />



                    <button type="submit">

                        Update Product

                    </button>

                </form>

            </div>



        </>
    )
}

export default UpdateProduct