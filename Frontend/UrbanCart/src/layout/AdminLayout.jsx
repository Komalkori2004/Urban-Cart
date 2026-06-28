import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import "./adminLayout.css"

import AdminSidebar from "../components/AdminSidebar"
import AdminNavbar from '../components/AdminNavbar'

const AdminLayout = () => {

   const [sidebarOpen,
    setSidebarOpen] =
    useState(false);


    return (

        <div className="admin-layout">
<AdminSidebar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
/>

            <div className="admin-main">

           <AdminNavbar
    setSidebarOpen={setSidebarOpen}
/>
                <div className="admin-content">

                    <Outlet />

                </div>

            </div>

        </div>
    )
}

export default AdminLayout