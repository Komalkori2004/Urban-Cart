


import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../Auth/signup'
import Login from '../Auth/login'
import ProtectRoute from './protectRoute'
import UserProfile from '../pages/userD'
import AdminProfile from '../pages/admin'
import Product from '../pages/product'
import SingleProduct from '../pages/singleProduct'
import CartPage from '../pages/cart'
import NavBar from '../components/navbar'





const AppRouter = () => {
    return (
        <>

            <BrowserRouter>
                <NavBar />

                <Routes>
                    <Route path="/" element={<Product />} />
                    <Route path="/product/:slug" element={<SingleProduct />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/profile"
                        element={<ProtectRoute>
                            <UserProfile />
                        </ProtectRoute>}
                    />
                    <Route path="/cart"
                        element={<ProtectRoute>
                            <CartPage />
                        </ProtectRoute>}
                    />




                    <Route path="/admin"
                        element={<ProtectRoute role="admin">
                            <AdminProfile />
                        </ProtectRoute>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter