import React from 'react'


import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/thunks/authThunks'

const Login = () => {


    const navigate = useNavigate()
    const [formData, setForm] = useState({

        email: "",
        password: ""
    })


    const dispatch = useDispatch()

    const { loading, error } = useSelector(state => state.auth)

    const handleChange = (e) => {
        setForm({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmite = async (e) => {
        e.preventDefault()
        const result = await dispatch(loginUser(formData))

        if (result.meta.requestStatus === "fulfilled") {
            if (result.payload.user.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/profile")
            }


        }

    }


    return (
        <>
            <div className="auth-container">

                <div className="auth-box">
                    <h2>Login</h2>
                    <form className="auth-form" onSubmit={handleSubmite}>

                        {/* <input type="text" name="name" placeholder="name" onChange={handleChange} value={formData.name} /><br/> */}
                        <input type="email" name="email" placeholder="email" onChange={handleChange} value={formData.email} /><br />
                        <input type="password" name="password" placeholder="password" onChange={handleChange} value={formData.password} /><br />
                        <button type="submit">{loading ? "Loading..." : "login"}</button>

                    </form>
                    {error && <p>{error}</p>}

                </div>


            </div>
        </>
    )
}

export default Login