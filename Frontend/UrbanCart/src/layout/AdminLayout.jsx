import React from 'react'
import { Outlet } from 'react-router-dom'
import "./adminLayout.css"

import AdminSidebar from "../components/AdminSidebar"
import AdminNavbar from '../components/AdminNavbar'

const AdminLayout = () => {

    return (
        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-main">

                <AdminNavbar />

                <div className="admin-content">

                    <Outlet />

                </div>

            </div>

        </div>
    )
}

export default AdminLayout