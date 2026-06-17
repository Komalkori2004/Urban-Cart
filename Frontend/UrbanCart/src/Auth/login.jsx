import React from 'react'
import './auth.css'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/thunks/authThunks'
import { useNavigate, Link } from 'react-router-dom'

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

                    <img

                        src="/logo/nav-logo.png"
                        alt="UrbanCart"


                        className="auth-logo"
                    />

                    <h2 className="auth-title">
                        Welcome Back
                    </h2>

                    <p className="auth-subtitle">
                        Sign in to continue your UrbanCart journey.
                    </p>


                    <form className="auth-form" onSubmit={handleSubmite}>

                        {/* <input type="text" name="name" placeholder="name" onChange={handleChange} value={formData.name} /><br/> */}
                        <input type="email" className="auth-input" name="email" placeholder="email" onChange={handleChange} value={formData.email} />
                        <input type="password" className="auth-input" name="password" placeholder="password" onChange={handleChange} value={formData.password} />
                        <button type="submit" className="auth-btn">
                            {loading ? "Signing In..." : "Login"}
                        </button>

                        <p className="auth-link">
                            Forgot Password?
                            <Link to="/forgot-password">
                                Reset Here
                            </Link>
                        </p>

                        <p className="auth-link">
                            Don't have an account?
                            <Link to="/signup">
                                Create Account
                            </Link>
                        </p>

                        {error && (
                            <p className="auth-error">
                                {error}
                            </p>
                        )}

                    </form>


                </div>


            </div>

        </>
    )
}

export default Login