import './style/navbar.css'

import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { HiMenu, HiX } from "react-icons/hi";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const location = useLocation()

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

        </div>

      </nav>


    </>
  )
}

export default NavBar