import React from 'react'
import { useParams } from "react-router-dom"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyEmail } from '../redux/thunks/authThunks'
import "../style/verifyemail.css"
function VerifyAccount() {

    const dispatch = useDispatch()
    const { token } = useParams()
    const { loading, error, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (token) {
            dispatch(verifyEmail(token));
        }
    }, [dispatch, token]);


    console.log("verify page")


    return (
        <div className="verify-page">

            <div className="verify-background-circle verify-circle-1"></div>
            <div className="verify-background-circle verify-circle-2"></div>

            <div className="verify-card">

                <div className="verify-top">

                    <span className="verify-badge">
                        ACCOUNT SECURITY
                    </span>

                    {
                        loading ?

                            <div className="verify-icon loading">
                                <span>⏳</span>
                            </div>

                            :

                            message ?

                                <div className="verify-icon success">
                                    ✓
                                </div>

                                :

                                <div className="verify-icon error">
                                    ✕
                                </div>
                    }

                </div>

                {

                    loading ?

                        <>

                            <h1>
                                Verifying Your Email
                            </h1>

                            <p>
                                Please wait while we securely verify your UrbanCart account.
                            </p>

                        </>

                        :

                        message ?

                            <>



                                <h2>
                                    Email Verified Successfully
                                </h2>

                                <p>
                                    Welcome to UrbanCart.

                                    Your account is now active and ready to explore our premium collections.
                                </p>

                                <div className="verify-divider"></div>

                                <div className="verify-benefits">

                                    <div className="benefit-card">
                                        <span>🔒</span>
                                        <p>Secure Account</p>
                                    </div>

                                    <div className="benefit-card">
                                        <span>✉</span>
                                        <p>Email Verified</p>
                                    </div>

                                    <div className="benefit-card">
                                        <span>✨</span>
                                        <p>Ready To Shop</p>
                                    </div>

                                </div>

                                <div className="verify-buttons">

                                    <button
                                        className="primary-btn"
                                        onClick={() => window.location.href = "/login"}
                                    >
                                        Login Now
                                    </button>

                                    <button
                                        className="secondary-btn"
                                        onClick={() => window.location.href = "/"}
                                    >
                                        Continue Shopping
                                    </button>

                                </div>

                            </>

                            :

                            <>

                                <h1>
                                    Verification Failed
                                </h1>

                                <p>
                                    {error}
                                </p>

                                <button
                                    className="primary-btn"
                                    onClick={() => window.location.href = "/"}
                                >
                                    Back To Home
                                </button>

                            </>

                }

            </div>

        </div>
    );
}

export default VerifyAccount