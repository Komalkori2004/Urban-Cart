import React,
{ useState }

from "react"

import {
useDispatch,
useSelector
}

from "react-redux"

import {
useParams,
useNavigate
}

from "react-router-dom"

import {
resetPassword
}

from "../redux/thunks/authThunks"



function ResetPassword(){

   const [password,
   setPassword]
   = useState("")



   const [confirmPassword,
   setConfirmPassword]
   = useState("")



   const dispatch =
   useDispatch()



   const navigate =
   useNavigate()



   const { token } =
   useParams()



   const {
      loading,
      error,
      message
   }
   =
   useSelector(
   (state)=>state.auth
   )



   const handleSubmit =
   async(e)=>{

      e.preventDefault()



      if(
         password !==
         confirmPassword
      ){

         return alert(
            "Passwords do not match"
         )
      }



      const result =
      await dispatch(

         resetPassword({

            token,

            password

         })
      )



      if(
         result.payload?.success
      ){

         navigate("/login")
      }
   }



   return(

      <div
      className="reset-container">

         <form
         onSubmit={handleSubmit}

         className="reset-form"
         >

            <h2>
               Reset Password
            </h2>



            <input

               type="password"

               placeholder=
               "New Password"

               value={password}

               onChange={(e)=>
               setPassword(
               e.target.value
               )
               }
            />



            <input

               type="password"

               placeholder=
               "Confirm Password"

               value={confirmPassword}

               onChange={(e)=>
               setConfirmPassword(
               e.target.value
               )
               }
            />



            <button type="submit">

               {
                  loading
                  ?
                  "Updating..."
                  :
                  "Reset Password"
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
   )
}

export default ResetPassword