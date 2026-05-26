

import React from 'react'
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

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
        <>

            <div
                className="forgot-container">

                <form
                    onSubmit={handleSubmit}

                    className="forgot-form"
                >

                    <h2>
                        Forgot Password
                    </h2>



                    <input
                        type="email"

                        placeholder=
                        "Enter your email"

                        value={email}

                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />



                    <button type="submit">

                        {
                            loading
                                ?
                                "Sending..."
                                :
                                "Send Reset Link"
                        }

                    </button>

                    {
                        message &&
                        <p>{message}</p>
                    }



                    {
                        error &&
                        <p>{error}</p>
                    }

                </form>

            </div>


        </>
    )
}

export default ForgotPassword