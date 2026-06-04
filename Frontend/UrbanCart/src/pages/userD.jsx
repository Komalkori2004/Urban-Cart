

import React, { useEffect, useState } from 'react'
import { getProfile } from '../redux/thunks/authThunks'
import { useDispatch, useSelector } from 'react-redux'



const UserProfile = () => {

  const dispatch = useDispatch()
  const { user,loading,error } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  console.log("user ",user)
    return (
        <>

<div>
  <h1>User Profile</h1>

  <h3>Name : {user?.name}</h3>

  <h3>Email : {user?.email}</h3>

  <h3>Role : {user?.role}</h3>

  <h3>
    Verified :
    {user?.isVerified ? " Yes" : " No"}
  </h3>
</div>

        </>
    )
}

export default UserProfile