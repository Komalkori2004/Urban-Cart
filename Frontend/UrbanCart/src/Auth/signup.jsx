import React from 'react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'



const Signup = () => {

    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [formData, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })


    const handleChange = (e) => {
        setForm({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmite = async (e) => {
        e.preventDefault()

        const result = await dispatch(registerUser(formData))

        if (result.payload?.success) {

            navigate("/login")

        }
    }


    return (
        <>
            <div className="auth-container">

                <div className="auth-box">

                    <h2>Signup</h2>
                    <form className="auth-form" onSubmit={handleSubmite}>

                        <input type="text" name="name" placeholder="name" onChange={handleChange} value={formData.name} /><br />
                        <input type="email" name="email" placeholder="email" onChange={handleChange} value={formData.email} /><br />
                        <input type="password" name="password" placeholder="password" onChange={handleChange} value={formData.password} /><br />

                        <button
                            type="submit"
                            disabled={loading}
                        >

                            {
                                loading
                                    ? "Loading..."
                                    : "Signup"
                            }

                        </button>

                    </form>
                    {
                        error && <p>{error}</p>
                    }

                </div>


            </div>
        </>
    )
}

export default Signup