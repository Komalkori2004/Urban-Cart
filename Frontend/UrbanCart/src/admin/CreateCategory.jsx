

import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { createCategory } from '../redux/thunks/categoryThunks'

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
            <div>

                <h1>Create Category</h1>

                <form onSubmit={handleSubmi}>

                    <input
                        type="text"
                        placeholder="Category Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <br />
                    <br />

                    <input
                        type="file"
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

                    <br />
                    <br />

                    {
                        preview && (

                            <img
                                src={preview}
                                alt="preview"
                                width="200"
                                  loading="lazy"
                            />

                        )
                    }

                    <br />
                    <br />

                    <button type="submit">
                        Create Category
                    </button>

                </form>

            </div>
        </>
    )
}

export default CreateCategory