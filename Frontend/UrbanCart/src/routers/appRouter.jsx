


import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../Auth/signup'
import Login from '../Auth/login'
import ProtectRoute from './protectRoute'
import UserProfile from '../pages/userD'
import AdminProfile from '../pages/admin'



const AppRouter = () => {
    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/profile"
                        element={<ProtectRoute>
                            <UserProfile />
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