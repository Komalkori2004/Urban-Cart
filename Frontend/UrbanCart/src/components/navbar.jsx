import './style/navbar.css'

import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { logoutUser } from "../redux/feature/authSlice"

import { clearCart } from "../redux/feature/cartSlice"

import { clearWishlist } from "../redux/feature/wishlistSlice"
import { HiMenu, HiX } from "react-icons/hi";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const location = useLocation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { wishlist = [] } = useSelector(
    (state) => state.wishlist
  )

  const { items = [] } = useSelector(
    (state) => state.cart
  )

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  if (location.pathname.includes("/admin")) {
    return null
  }

  const cartCount = items.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)



  const handleLogout = () => {
    dispatch(logoutUser())

    dispatch(clearCart())

    dispatch(clearWishlist())
    navigate("/")
  }

  const wishlistcount = wishlist.length
  return (
    <>

      <nav className="navbar">

        <div className="nav-left">

          <Link to="/">Home</Link>

          <Link to="/products">Shop</Link>

        </div>

        <div className="nav-logo">

          <Link to="/">
            <img
              src="/logo/nav-logo.png"
              alt="UrbanCart"
                loading="lazy"

            />
          </Link>

        </div>

        <div className="nav-right">
          {user?.role === "admin" && (
            <Link to="/admin">
              Dashboard
            </Link>
          )}

          <Link to="/wishlist">
            Wishlist ({wishlistcount})
          </Link>

          <Link to="/cart">
            Cart ({cartCount})
          </Link>

          <Link to="/profile">
            Profile
          </Link>
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {
            menuOpen
              ? <HiX />
              : <HiMenu />
          }
        </div>

        <div
          className={`mobile-menu ${menuOpen ? "active" : ""}`}
        >

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
          >
            Wishlist ({wishlistcount})
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
          >
            Cart ({cartCount})
          </Link>

          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <button
            className="logout-btn"
            onClick={() => {
              handleLogout()
              setMenuOpen(false)
            }}
          >
            Logout
          </button>

        </div>

      </nav>


    </>
  )
}

export default NavBar