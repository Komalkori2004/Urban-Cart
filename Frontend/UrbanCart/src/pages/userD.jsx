

import React, { useEffect, useState } from 'react'
import { getProfile } from '../redux/thunks/authThunks'
import { useDispatch, useSelector } from 'react-redux'
import { getAddresses } from '../redux/thunks/authThunks'
import { useNavigate } from "react-router-dom"

import "../style/userD.css"

const UserProfile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading, error, addresses } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getProfile())
    dispatch(getAddresses())
  }, [dispatch])


  console.log("user ", user)
  return (
    <>
      <div className="container">

        <div className="profile-container">

          {/* <div className="profile-card">

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

          </div> */}



          <div className="profile-hero">

            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="profile-info">

              <h2>{user?.name}</h2>

              <p>{user?.email}</p>

              {
                user?.isVerified ? (
                  <span className="verified-badge">
                    ✓ Verified Account
                  </span>
                ) : (
                  <span className="unverified-badge">
                    Not Verified
                  </span>
                )
              }

            </div>

          </div>

       <div className="profile-grid">

  <div className="profile-section">

    <h2>Personal Information</h2>

    <div className="info-card">
      <span>Full Name</span>
      <h4>{user?.name}</h4>
    </div>

    <div className="info-card">
      <span>Email</span>
      <h4>{user?.email}</h4>
    </div>

    <div className="info-card">
      <span>Role</span>
      <h4>{user?.role}</h4>
    </div>

  </div>

  <div className="profile-section">

    <h2>Account Overview</h2>

    <div className="stats-grid">

      <div className="stat-card">
        <h3>{addresses?.length}</h3>
        <p>Addresses</p>
      </div>

      <div className="stat-card">
        <h3>0</h3>
        <p>Orders</p>
      </div>

      <div className="stat-card">
        <h3>0</h3>
        <p>Wishlist</p>
      </div>

    </div>

  </div>

</div>
          <div className="address-section">

            <div className="address-header">

              <h2>Saved Addresses</h2>

              <button
                className="add-address-btn"
                onClick={() => navigate("/add-address")}
              >
                + Add Address
              </button>

            </div>

            <div className="address-grid">

              {addresses?.map((address) => (

                <div
                  key={address._id}
                  className="address-card"
                >

                  <h4>{address.fullName}</h4>

                  <p>{address.phone}</p>

                  <p>
                    {address.addressLine1}
                  </p>

                  <p>
                    {address.city}, {address.state}
                  </p>

                  <p>
                    {address.pincode}
                  </p>
                  {
                    address.isDefault && (
                      <span className="default-badge">
                        ⭐ Default Address
                      </span>
                    )
                  }


                </div>

              ))}

            </div>

          </div>


        </div>



      </div>

    </>
  )
}

export default UserProfile