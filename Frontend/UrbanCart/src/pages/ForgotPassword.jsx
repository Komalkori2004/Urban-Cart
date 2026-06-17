

import React from 'react'
import { useState } from 'react'
import "../Auth/auth.css"

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../redux/thunks/authThunks'

function ForgotPassword() {

    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const { loading, error, message } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(forgotPassword(email))
        console.log(email)


    }


   
return (
    <div className="auth-container">

        <div className="auth-box">

            <img
                src="/logo/nav-logo.png"
                alt="UrbanCart"
                className="auth-logo"
            />

            <h2 className="auth-title">
                Forgot Password
            </h2>

            <p className="auth-subtitle">
                Enter the email associated with your account
                and we'll send you a secure password reset link.
            </p>

            <form
                onSubmit={handleSubmit}
                className="auth-form"
            >

                <input
                    type="email"
                    className="auth-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <button
                    type="submit"
                    className="auth-btn"
                >
                    {
                        loading
                            ? "Sending..."
                            : "Send Reset Link"
                    }
                </button>

            </form>

            <p className="auth-link">
                Remember your password?
                <Link to="/login">
                    Login
                </Link>
            </p>

            {
                message &&
                <p className="auth-success">
                    {message}
                </p>
            }

            {
                error &&
                <p className="auth-error">
                    {error}
                </p>
            }

        </div>

    </div>
)


}

export default ForgotPassword