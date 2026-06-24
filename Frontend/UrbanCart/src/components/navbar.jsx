import './style/navbar.css'

import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { logoutUser } from "../redux/feature/authSlice"
import { useCallback } from "react";
import { clearCart } from "../redux/feature/cartSlice"

import { clearWishlist } from "../redux/feature/wishlistSlice"



import { searchProducts } from "../redux/thunks/productThunks"
import { HiMenu, HiX } from "react-icons/hi";
import {
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiSearch
} from "react-icons/fi";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false);
  const [showAccountMenu, setShowAccountMenu] =
    useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  // const [search, setSearch] = useState("")



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

  const { searchResults, searchLoading } = useSelector((state) => state.products)

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


  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    navigate(
      `/products?keyword=${encodeURIComponent(
        searchTerm
      )}`
    );


    setShowSearch(false);
  };


  useEffect(() => {

    const timer = setTimeout(() => {

      if (searchTerm.trim()) {

        dispatch(
          searchProducts(searchTerm)
        )

      }

    }, 500)

    return () =>
      clearTimeout(timer)

  }, [searchTerm, dispatch])

  const closeSearchModal = () => {
    setShowSearch(false);
    setSearchTerm("");
  };

  return (
    <>

      <nav className="navbar">

        <div className="nav-left">
          <button
            className="search-btn"
            onClick={() => setShowSearch(true)}
          >
            <FiSearch />

          </button>

          <Link to="/">
            <FiHome />
            Home
          </Link>

          <Link to="/products">
            <FiShoppingBag />
            Shop
          </Link>

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
          {/* {user?.role === "admin" && (
              <Link to="/admin">
                <FiUser />
                Dashboard
              </Link>
            )} */}
          <Link to="/cart">
            <FiShoppingCart />
            Cart ({cartCount})
          </Link>

          <Link to="/wishlist">
            <FiHeart />
            Wishlist ({wishlistcount})
          </Link>

          <div className="account-dropdown">

            <button
              className="account-btn"
              onClick={() =>
                setShowAccountMenu(!showAccountMenu)
              }
            >
              <FiUser />
              Account
            </button>

            {showAccountMenu && (

              <div className="account-menu">

                <Link
                  to="/profile"
                  onClick={() =>
                    setShowAccountMenu(false)
                  }
                >
                  Profile
                </Link>

                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() =>
                      setShowAccountMenu(false)
                    }
                  >
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleLogout();
                    setShowAccountMenu(false);
                  }}
                >
                  Logout
                </button>

              </div>

            )}

          </div>

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


      {
        showSearch && (
          <div className="search-overlay">

            <div className="search-modal">

              <button
                className="search-close"
                onClick={closeSearchModal}
              >
                ✕
              </button>

              <h2>
                Search Products
              </h2>

              <form onSubmit={handleSearch}>
                {searchResults.length > 0 && (
                  <p className="search-count">
                    {searchResults.length} products found
                  </p>
                )}

              <div className="search-input-wrapper">

  <FiSearch className="search-input-icon" />

  <input
    type="text"
    placeholder="Search luxury products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

</div>
              </form>

              {searchTerm.trim() && (
                <div className="search-results">

                  {searchLoading && (
                    <p>Searching...</p>
                  )}
                  {searchTerm.trim() &&
                    !searchLoading &&
                    searchResults.length === 0 && (
                      <p className="no-results">
                        No products found
                      </p>
                    )}

                  {searchResults?.map((product) => (

                    <div
                      key={product._id}
                      className="search-item"
                      onClick={() => {
                        navigate(`/product/${product.slug}`);
                        closeSearchModal();
                      }}
                    >

                      <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className="search-item-image"
                      />

                      <div className="search-item-info">
                        <h4>{product.name}</h4>
                        <p>₹{product.price}</p>
                      </div>

                    </div>

                  ))}

                </div>
              )}


            </div>

          </div>
        )
      }


    </>
  )
}

export default NavBar