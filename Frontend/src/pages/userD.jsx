

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
        <div className="user-dashboard">

            <div className="container">

                {/* HERO SECTION */}

                <section className="dashboard-hero">

                    <div className="hero-avatar">

                        <div className="profile-avatar">

                            {
                                user?.name
                                    ?.charAt(0)
                                    .toUpperCase()
                            }

                        </div>

                    </div>

                    <div className="hero-content">

                        <p className="dashboard-subtitle">
                            MY PROFILE
                        </p>

                        <h1 className="dashboard-title">

                            Welcome Back,

                            <span>
                                {user?.name}
                            </span>

                        </h1>

                        <p className="dashboard-desc">

                            Manage your account,
                            addresses and shopping
                            preferences.

                        </p>

                        {
                            user?.isVerified ? (

                                <div className="verified-badge">

                                    ✓ Verified Account

                                </div>

                            ) : (

                                <div className="unverified-badge">

                                    Not Verified

                                </div>

                            )
                        }

                    </div>

                </section>


                {/* STATS */}

                <section className="dashboard-stats">

                    <div className="stat-card">

                        <h2>
                            {addresses?.length || 0}
                        </h2>

                        <p>
                            Addresses
                        </p>

                    </div>

                    <div className="stat-card">

                        <h2>
                            0
                        </h2>

                        <p>
                            Orders
                        </p>

                    </div>

                    <div className="stat-card">

                        <h2>
                            0
                        </h2>

                        <p>
                            Wishlist
                        </p>

                    </div>

                    <div className="stat-card">

                        <h2>
                            {
                                user?.isVerified
                                    ? "✓"
                                    : "✕"
                            }
                        </h2>

                        <p>
                            Status
                        </p>

                    </div>

                </section>


                {/* MAIN GRID */}

                <section className="dashboard-grid">

                    {/* PERSONAL INFO */}

                    <div className="dashboard-card">

                        <div className="card-title">

                            Personal Information

                        </div>


                        <div className="info-row">

                            <span>
                                Full Name
                            </span>

                            <h4>
                                {user?.name}
                            </h4>

                        </div>


                        <div className="info-row">

                            <span>
                                Email Address
                            </span>

                            <h4>
                                {user?.email}
                            </h4>

                        </div>


                        <div className="info-row">

                            <span>
                                Role
                            </span>

                            <h4>
                                {user?.role}
                            </h4>

                        </div>


                        <div className="info-row">

                            <span>
                                Status
                            </span>

                            <h4>

                                {
                                    user?.isVerified
                                        ? "Verified"
                                        : "Pending"
                                }

                            </h4>

                        </div>

                    </div>



                    {/* ADDRESS SECTION */}

                    <div className="dashboard-card">

                        <div className="address-header">

                            <h2>

                                Saved Addresses

                            </h2>

                            <button

                                className="add-address-btn"

                                onClick={() =>
                                    navigate(
                                        "/add-address"
                                    )
                                }

                            >

                                + Add Address

                            </button>

                        </div>


                        <div className="address-grid">

                            {
                                addresses?.map(
                                    (address) => (

                                        <div

                                            key={
                                                address._id
                                            }

                                            className="address-card"
                                        >

                                            {
                                                address.isDefault && (

                                                    <div
                                                        className="default-badge"
                                                    >

                                                        Default

                                                    </div>

                                                )
                                            }

                                            <h4>

                                                {
                                                    address.fullName
                                                }

                                            </h4>

                                            <p>

                                                {
                                                    address.phone
                                                }

                                            </p>

                                            <p>

                                                {
                                                    address.addressLine1
                                                }

                                            </p>

                                            <p>

                                                {
                                                    address.city
                                                }

                                                ,

                                                {
                                                    address.state
                                                }

                                            </p>

                                            <p>

                                                {
                                                    address.pincode
                                                }

                                            </p>

                                        </div>
                                    )
                                )
                            }

                        </div>

                    </div>

                </section>



                {/* QUICK ACTIONS */}

                <section className="quick-actions">

                    <h2>

                        Quick Actions

                    </h2>

                    <div className="quick-grid">

                        <button
                            className="quick-card"

                            onClick={() =>
                             navigate("/dashboard/orders")
                            }
                        >

                            My Orders

                        </button>

                        <button
                            className="quick-card"

                            onClick={() =>
                              navigate("/dashboard/wishlist")

                            }
                        >

                            Wishlist

                        </button>

                        <button
                            className="quick-card"

                            onClick={() =>
                             navigate("/dashboard/cart")
                            }
                        >

                            Cart

                        </button>

                        <button
                            className="quick-card"

                            onClick={() =>
                              navigate("/add-address")
                            }
                        >

                            Add Address

                        </button>

                    </div>

                </section>

            </div>

        </div>
    </>
)
}

export default UserProfile