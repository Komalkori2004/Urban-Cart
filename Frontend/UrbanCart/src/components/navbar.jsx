import './style/navbar.css'

import React from 'react'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const NavBar = () => {

  const location = useLocation()
  if (location.pathname.includes("/admin")) {
    return null
  }

  const { items = [] } = useSelector((state) => state.cart)

  const cartCount = items.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)
  return (
    <>

      <nav className="navbar">

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Shop
          </Link>



          <div className="nav-logo">

            <Link to="/">

              <img
                src="/logo/nav-logo.png"
                alt="UrbanCart"
              />

            </Link>

          </div>



          <Link to="/wishlist">
            Wishlist
          </Link>

          <Link to="/cart">
            Cart ({cartCount})
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>

      </nav>




    </>
  )
}

export default NavBar