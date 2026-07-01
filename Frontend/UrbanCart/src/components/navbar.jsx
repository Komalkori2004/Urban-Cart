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

  <div className="container navbar-container">

    {/* LEFT */}
    <div className="navbar-left">

      <button
        className="search-btn"
        onClick={() => setShowSearch(true)}
      >
        <FiSearch />
      </button>

      <Link className="nav-item" to="/">
        <FiHome />
        <span>Home</span>
      </Link>

      <Link className="nav-item" to="/products">
        <FiShoppingBag />
        <span>Shop</span>
      </Link>

    </div>


    {/* LOGO */}

    <div className="navbar-logo">

      <Link to="/">
        <img
          src="/logo/nav-logo.png"
          alt="logo"
        />
      </Link>

    </div>


    {/* RIGHT */}

    <div className="navbar-right">

      <Link
        className="nav-item badge-item"
        to="/wishlist"
      >
        <FiHeart />

        <span>Wishlist</span>

        {
          wishlistcount > 0 && (
            <div className="nav-badge">
              {wishlistcount}
            </div>
          )
        }

      </Link>


      <Link
        className="nav-item badge-item"
        to="/cart"
      >
        <FiShoppingCart />

        <span>Cart</span>

        {
          cartCount > 0 && (
            <div className="nav-badge">
              {cartCount}
            </div>
          )
        }

      </Link>


    {
  user ? (

    <div className="account-dropdown">

      <button
        className="account-btn"
        onClick={() =>
          setShowAccountMenu(
            !showAccountMenu
          )
        }
      >
        <FiUser />
        <span>My Account</span>
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

  ) : (

    <div className="auth-buttons">

      <Link
        className="login-btn"
        to="/login"
      >
        <FiUser />
        <span>Login</span>
      </Link>

      <Link
        className="register-btn"
        to="/signup"
      >
        Register
      </Link>

    </div>

  )
}

    </div>


    {/* MOBILE */}

    <button
      className="mobile-toggle"
      onClick={() =>
        setMenuOpen(!menuOpen)
      }
    >
      {
        menuOpen
          ? <HiX />
          : <HiMenu />
      }
    </button>


    

  </div>

</nav>


{/* MOBILE MENU */}

<div
  className={`mobile-menu ${
    menuOpen ? "active" : ""
  }`}
>

  {/* HEADER */}

  <div className="mobile-header">

    <img
      src="/logo/nav-logo.png"
      alt="UrbanCart"
    />

    <button
      className="mobile-close"
      onClick={() => setMenuOpen(false)}
    >
      <HiX />
    </button>

  </div>


  {/* LINKS */}

  <div className="mobile-links">

    <button
      className="mobile-link"
      onClick={() => {

        setShowSearch(true)

        setMenuOpen(false)

      }}
    >
      <FiSearch />

      <span>
        Search
      </span>

    </button>


    <Link
      className="mobile-link"
      to="/"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      <FiHome />

      <span>
        Home
      </span>

    </Link>


    <Link
      className="mobile-link"
      to="/products"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      <FiShoppingBag />

      <span>
        Shop
      </span>

    </Link>


    <Link
      className="mobile-link"
      to="/wishlist"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      <FiHeart />

      <span>
        Wishlist
      </span>

      {
        wishlistcount > 0 && (

          <div className="mobile-badge">
            {wishlistcount}
          </div>

        )
      }

    </Link>


    <Link
      className="mobile-link"
      to="/cart"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      <FiShoppingCart />

      <span>
        Cart
      </span>

      {
        cartCount > 0 && (

          <div className="mobile-badge">
            {cartCount}
          </div>

        )
      }

    </Link>


    <Link
      className="mobile-link"
      to="/profile"
      onClick={() =>
        setMenuOpen(false)
      }
    >
      <FiUser />

      <span>
        Profile
      </span>

    </Link>


   {user ? (
  <>
    <Link
      className="mobile-link"
      to="/profile"
      onClick={() => setMenuOpen(false)}
    >
      <FiUser />
      <span>Profile</span>
    </Link>

    {user?.role === "admin" && (
      <Link
        className="mobile-link"
        to="/admin"
        onClick={() => setMenuOpen(false)}
      >
        <FiUser />
        <span>Dashboard</span>
      </Link>
    )}

    <button
      className="mobile-link mobile-logout"
      onClick={() => {
        handleLogout();
        setMenuOpen(false);
      }}
    >
      <FiLogOut />
      <span>Logout</span>
    </button>
  </>
) : (
  <>
    <Link
      className="mobile-link"
      to="/login"
      onClick={() => setMenuOpen(false)}
    >
      <FiUser />
      <span>Login</span>
    </Link>

    <Link
      className="mobile-link"
      to="/signup"
      onClick={() => setMenuOpen(false)}
    >
      <FiUser />
      <span>Register</span>
    </Link>
  </>
)}

  </div>


  {/* LOGOUT */}

  {/* <button
    className="mobile-logout"
    onClick={() => {

      handleLogout()

      setMenuOpen(false)

    }}
  >
    <FiLogOut />

    <span>
      Logout
    </span>

  </button> */}

  

</div>


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