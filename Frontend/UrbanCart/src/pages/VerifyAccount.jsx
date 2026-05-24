import React from 'react'
import { useParams } from "react-router-dom"

function VerifyAccount() {

    const { token } = useParams()


    console.log("verify page")



    return (
        <>
            <div
                className="verify-page">

                <h1>
                    Verifying Account...
                </h1>

                <p>
                    Token:
                    {token}
                </p>

            </div>

        </>
    )
}

export default VerifyAccount