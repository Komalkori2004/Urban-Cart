import React from 'react'
import { useParams } from "react-router-dom"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyEmail } from '../redux/thunks/authThunks'
function VerifyAccount() {

    const dispatch = useDispatch()
    const { token } = useParams()
    const { loading, error, message } = useSelector((state) => state.auth)


    useEffect(() => {
        dispatch(verifyEmail(token))
    }, [])



    console.log("verify page")



    return (

        <div
            className="verify-page">

            {
                loading
                    ?
                    <h2>
                        Verifying...
                    </h2>

                    :

                    message
                        ?

                        <h2>
                            {message}
                        </h2>

                        :

                        <h2>
                            {error}
                        </h2>
            }

        </div>
    )
}

export default VerifyAccount