
import React, { useState } from 'react';
import './auth.css';

import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../redux/thunks/authThunks';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {

    const dispatch = useDispatch();

    const { loading, error } =
        useSelector((state) => state.auth);

    const navigate = useNavigate();

    const [formData, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmite = async (e) => {

        e.preventDefault();

        const result =
            await dispatch(
                registerUser(formData)
            );

        if (result.payload?.success) {

            navigate("/login");
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <img
                    src="/logo/nav-logo.png"
                    alt="UrbanCart"
                    className="auth-logo"
                />

                <h2 className="auth-title">
                    Create Account
                </h2>

                <p className="auth-subtitle">
                    Join UrbanCart and discover premium
                    fashion, beauty, and lifestyle collections.
                </p>

                <form
                    className="auth-form"
                    onSubmit={handleSubmite}
                >

                    <input
                        type="text"
                        name="name"
                        className="auth-input"
                        placeholder="Enter your full name"
                        onChange={handleChange}
                        value={formData.name}
                    />

                    <input
                        type="email"
                        name="email"
                        className="auth-input"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        value={formData.email}
                    />

                    <input
                        type="password"
                        name="password"
                        className="auth-input"
                        placeholder="Create a password"
                        onChange={handleChange}
                        value={formData.password}
                    />

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Creating Account..."
                                : "Create Account"
                        }
                    </button>

                </form>

                <p className="auth-link">
                    Already have an account?
                    <Link to="/login">
                        Login
                    </Link>
                </p>

                {
                    error &&
                    <p className="auth-error">
                        {error}
                    </p>
                }

            </div>

        </div>
    );
};

export default Signup;

