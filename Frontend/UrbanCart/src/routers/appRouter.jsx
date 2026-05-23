


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





const AppRouter = () => {
    return (
        <>

            <BrowserRouter>
                <NavBar />

                <Routes>

                    {/* for all customer  */}

                    <Route path="/" element={<Product />} />
                    <Route path="/product/:slug" element={<SingleProduct />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />





                    {/* only user can access */}
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






                    {/* only admin can access */
                    }
                    <Route path="/admin"
                        element={<ProtectRoute role="admin">
                            <AdminProfile />
                        </ProtectRoute>} />


                    <Route path="/admin/add-product"
                        element={<ProtectRoute role="admin">
                            <CreateProduct />
                        </ProtectRoute>} />
                         <Route path="/admin/all-product"
                        element={<ProtectRoute role="admin">
                            <AdminProducts />
                        </ProtectRoute>} />






                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter