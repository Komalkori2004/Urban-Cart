

import React from 'react'
import { useState } from 'react'
import "../Auth/auth.css"

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../redux/thunks/authThunks'
import { toast } from "sonner";

function ForgotPassword() {

    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const { loading, error, message } = useSelector((state) => state.auth)

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            toast.warning(
                "Please enter your email address"
            );

            return;
        }

        const result = await dispatch(
            forgotPassword(email)
        );

        if (
            forgotPassword.fulfilled.match(result)
        ) {

            toast.success(
                result.payload?.message ||
                "Password reset link sent successfully"
            );

        } else {

            toast.error(
                result.payload ||
                "Unable to send password reset link"
            );
        }
    };



    return (
        <div className="auth-container">

            <div className="auth-box">

                <img
                    src="/logo/nav-logo.png"
                    alt="UrbanCart"
                    className="auth-logo"
                    loading="lazy"
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
                        disabled={loading}
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



            </div>

        </div>
    )


}

export default ForgotPassword