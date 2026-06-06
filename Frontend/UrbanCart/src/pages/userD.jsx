

import React, { useEffect, useState } from 'react'
import { getProfile } from '../redux/thunks/authThunks'
import { useDispatch, useSelector } from 'react-redux'

import "../style/userD.css"

const UserProfile = () => {

  const dispatch = useDispatch()
  const { user, loading, error } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  console.log("user ", user)
  return (
    <>
    <div className="container">

      <div className="profile-container">

        <div className="profile-card">

          <div className="profile-header">

            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h2>{user?.name}</h2>

            <p className="profile-tag">
              Premium Member
            </p>

          </div>

          <div className="profile-item">
            <span>Name</span>
            <h3>{user?.name}</h3>
          </div>

          <div className="profile-item">
            <span>Email</span>
            <h3>{user?.email}</h3>
          </div>

          <div className="profile-item">
            <span>Role</span>
            <h3>{user?.role}</h3>
          </div>

          <div className="profile-item">
            <span>Status</span>

            {
              user?.isVerified ? (
                <div className="verified-badge">
                  Verified
                </div>
              ) : (
                <div className="unverified-badge">
                  Not Verified
                </div>
              )
            }
          </div>

        </div>

      </div>
      </div>
    </>
  )
}

export default UserProfile