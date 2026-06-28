import React from 'react'
import "./style/adminNavbar.css"

const AdminNavbar = ({
    setSidebarOpen
}) => {

    return (

        <div className='admin-navbar'>

            <button
                className="sidebar-toggle"
                onClick={() =>
                    setSidebarOpen(
                        prev => !prev
                    )
                }
            >
                ☰
            </button>

            <h2 className="admin-navbar-title">
                UrbanCart Admin
            </h2>

        </div>
    )
}

export default AdminNavbar