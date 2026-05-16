import React from 'react'
import { Navigate } from 'react-router-dom'


const ProtectRoute = ({ children, role }) => {

    const token = localStorage.getItem("token")

    
    const user = JSON.parse(
        localStorage.getItem("user")
    )
    if (!token) {
        return <Navigate to="/login" />
    }

    // role check
    if (role && user?.role !== role) {
        return <Navigate to="/profile" />
    }



    return children
}

export default ProtectRoute