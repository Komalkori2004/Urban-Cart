


import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../Auth/signup'
import Login from '../Auth/login'
import ProtectRoute from './protectRoute'
import UserProfile from '../pages/userD'
import AdminProfile from '../admin/admin'
import Product from '../pages/product'
import SingleProduct from '../pages/singleProduct'
import CartPage from '../pages/cart'
import NavBar from '../components/navbar'
import CreateProduct from '../admin/UpdateProduct'
import AdminProducts from '../admin/AdminProducts'
import UpdateProduct from '../admin/UpdateProduct'

import AdminLayout from '../layout/AdminLayout'
import VerifyAccount from '../pages/VerifyAccount'

import ForgotPassword from '../pages/ForgotPassword' 

import ResetPassword from '../pages/ResetPassword'

import HomePage from '../pages/home'

import AdminOrder from '../admin/AdminOrder'

import MyOrders from '../pages/MyOrders'

import CheckoutPage from '../pages/CheckoutPage'
import CreateCategory from '../admin/CreateCategory'

import WishlistPage from '../pages/WishlistPage'





const AppRouter = () => {
    return (
        <>

            <BrowserRouter>

                <NavBar />

                <Routes>

                      

                    {/* PUBLIC ROUTES */}
                      <Route path="/" element={<HomePage />}/>

                    <Route path="/products" element={<Product />} />
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

                    <Route
                        path="/my-orders"
                        element={
                            <ProtectRoute>
                                <MyOrders />
                            </ProtectRoute>
                        }
                    />

                    <Route
                        path="/checkout"
                        element={
                            <ProtectRoute>
                                <CheckoutPage />
                            </ProtectRoute>
                        }
                    />
                    
                    <Route
                        path="/wishlist"
                        element={
                            <ProtectRoute>
                                <WishlistPage />
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
                        <Route
                            path="orders"
                            element={<AdminOrder />}
                        />
                        <Route
                        path='add-Category'
                        element={<CreateCategory />}
                        />
                    </Route>

                </Routes>

            </BrowserRouter>
        </>
    )
}

export default AppRouter