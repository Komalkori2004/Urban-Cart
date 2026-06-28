

import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { createCategory } from '../redux/thunks/categoryThunks'

import "../admin/style/createCategory.css"
// import "./style/createCategory.css"

function CreateCategory() {

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState("")


    const handleSubmi=(e)=>{
        e.preventDefault()
         console.log("submit clicked")
        const formdata = new FormData()
        formdata.append("name",name)
        formdata.append("image",image)
        dispatch(createCategory(formdata))
        
    }




    return (
        <>
           <div className="admin-category-page">
    <div className="admin-container">

        <div className="category-header">
            <h1 className="category-title">
                Create Category
            </h1>

            <p className="category-subtitle">
                Add a new category to your UrbanCart store
            </p>
        </div>

        <div className="category-form-card">
            <form
                className="category-form"
                onSubmit={handleSubmi}
            >
               <input
                        type="text"
                        className='category-input'
                        placeholder="Category Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                 
                    <input
                        type="file"
                           className='category-file'
                        accept="image/*"
                        onChange={(e) => {

                            const file =
                                e.target.files[0]

                            setImage(file)

                            setPreview(
                                URL.createObjectURL(file)
                            )
                        }}
                    />

                   

                    {
                        preview && (

                            <img
                            className='category-preview'
                                src={preview}
                                alt="preview"
                                width="200"
                                  loading="lazy"
                            />

                        )
                    }

                   

                    <button type="submit" className='category-btn'>
                        Create Category
                    </button>
            </form>
        </div>

    </div>
</div>

        </>
    )
}

export default CreateCategory