

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, } from 'react-router-dom'
import { getAllCategory } from '../redux/thunks/categoryThunks'

import { toast } from "sonner";

import { useDispatch, useSelector } from "react-redux";

import { getSingleProductById, updateProduct } from '../redux/thunks/productThunks';


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

                    </select><br />



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
                    />

                    <div className='preview-container'>

                        {
                            previewImages.length > 0
                                ?

                                previewImages.map((img, index) => (

                                    <img
                                        key={index}
                                        src={img}
                                          loading="lazy"
                                        alt='preview'
                                        className='preview-image'
                                    />

                                ))

                                :

                                singleProduct?.images?.map((img, index) => (

                                    <img
                                        key={index}
                                        src={img.url}
                                        alt='old-product'
                                        className='preview-image'
                                    />

                                ))
                        }

                    </div>






                    <br />



                    <button type="submit" disabled={loading}>

                        {
                            loading ? "updating..." : "update product"
                        }

                    </button>

                </form>

            </div>



        </>
    )
}

export default UpdateProduct