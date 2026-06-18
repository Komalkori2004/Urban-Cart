import React, { useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import { useParams, useNavigate, Link } from "react-router-dom";
import "../Auth/auth.css"

import {
   resetPassword
}

   from "../redux/thunks/authThunks"



function ResetPassword() {

   const [password, setPassword] = useState("")



   const [confirmPassword, setConfirmPassword] = useState("")



   const dispatch = useDispatch()



   const navigate = useNavigate()



   const { token } = useParams()



   const { loading, error, message } = useSelector((state) => state.auth)



   const handleSubmit =
      async (e) => {

         e.preventDefault()



         if (password !== confirmPassword) {

            return alert(
               "Passwords do not match"
            )
         }



         const result =
            await dispatch(

               resetPassword({ token, password }))



         if (result.payload?.success) { 
            navigate("/login")
          }
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
               Create New Password
            </h2>

            <p className="auth-subtitle">
               Your new password should be secure and
               different from previously used passwords.
            </p>

            <form
               onSubmit={handleSubmit}
               className="auth-form"
            >

               <input
                  type="password"
                  className="auth-input"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) =>
                     setPassword(e.target.value)
                  }
               />

               <input
                  type="password"
                  className="auth-input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                     setConfirmPassword(e.target.value)
                  }
               />

               <button
                  type="submit"
                  className="auth-btn"
               >

                  {
                     loading
                        ?
                        "Updating..."
                        :
                        "Reset Password"
                  }

               </button>

            </form>

            <p className="auth-link">
               Back to
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

export default ResetPassword