import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import "./adminLayout.css"
import NavBar from '../components/NavBar'

import AdminSidebar from "../components/AdminSidebar"
import AdminNavbar from '../components/AdminNavbar'

const AdminLayout = () => {

    const [sidebarOpen,
        setSidebarOpen] =
        useState(false);


    return (
    <>
 <AdminNavbar
    title="Manage Products"
    subtitle="Dashboard Panel"
    setSidebarOpen={setSidebarOpen}
/>  

    <div className="admin-layout">

        <AdminSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
        />

        <main className="admin-main">

            <div className="admin-content">
                <Outlet />
            </div>

        </main>

    </div>
</>
    )
}

export default AdminLayout