


import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../Auth/signup'
import Login from '../Auth/login'
import ProtectRoute from './protectRoute'
import UserProfile from '../pages/userD'
import AdminProfile from '../pages/admin/admin'
import Product from '../pages/product'
import SingleProduct from '../pages/singleProduct'
import CartPage from '../pages/cart'
import NavBar from '../components/navbar'
import CreateProduct from '../pages/admin/createProduct'
import AdminProducts from '../pages/admin/AdminProducts'
import UpdateProduct from '../pages/admin/UpdateProduct'

import AdminLayout from '../layout/AdminLayout'
import VerifyAccount from '../pages/VerifyAccount'

import ForgotPassword from '../pages/ForgotPassword' 

import ResetPassword from '../pages/ResetPassword'





const AppRouter = () => {
    return (
        <>

            <BrowserRouter>

                <NavBar />

                <Routes>

                    {/* PUBLIC ROUTES */}

                    <Route path="/" element={<Product />} />
                    <Route path="/product/:slug" element={<SingleProduct />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/verify/:token"
                        element={<VerifyAccount />}
                    />

                    <Route path="/forgot-password" element={<ForgotPassword />} />
                     <Route path="/reset-password/:token" element={<ResetPassword />} />



                    {/* USER ROUTES */}

                    <Route
                        path="/profile"
                        element={
                            <ProtectRoute>
                                <UserProfile />
                            </ProtectRoute>
                        }
                    />

                    <Route
                        path="/cart"
                        element={
                            <ProtectRoute>
                                <CartPage />
                            </ProtectRoute>
                        }
                    />



                    {/* ADMIN ROUTES */}

                    <Route
                        path="/admin"
                        element={
                            <ProtectRoute role="admin">
                                <AdminLayout />
                            </ProtectRoute>
                        }
                    >
                        <Route index element={<AdminProfile />} />

                        <Route
                            path="add-product"
                            element={<CreateProduct />}
                        />

                        <Route
                            path="all-product"
                            element={<AdminProducts />}
                        />

                        <Route
                            path="update-product/:id"
                            element={<UpdateProduct />}
                        />
                    </Route>

                </Routes>

            </BrowserRouter>
        </>
    )
}

export default AppRouter