
import React from 'react'
import { NavLink } from 'react-router-dom'
import "./style/adminSidebar.css"

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {



    return (
        <>
            <aside
                className={`admin-sidebar ${sidebarOpen ? "open" : ""
                    }`}
            >

                <button
                    className="close-admin-sidebar"
                    onClick={() => setSidebarOpen(false)}
                >
                    ✕
                </button>

                {/* ADMIN PROFILE */}

                <div className="admin-profile-box">

                    <div className="admin-avatar">
                        A
                    </div>

                    <h3>
                        Admin
                    </h3>

                    <p>
                        Super Admin
                    </p>

                </div>


                {/* MENU */}

                <div className="admin-sidebar-menu">

                    <NavLink
                        to="/admin"
                        end
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className={({ isActive }) =>
                            isActive
                                ? "active-link"
                                : ""
                        }
                    >
                        Dashboard
                    </NavLink>


                    <NavLink
                        to="/admin/add-product"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className={({ isActive }) =>
                            isActive ? "active-link" : ''
                        }
                    >
                        add-Product
                    </NavLink>

                    <NavLink to="/admin/add-Category"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                        Add-Category
                    </NavLink>

                    <NavLink
                        to="/admin/all-product"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className={({ isActive }) =>
                            isActive ? "active-link" : ''
                        }
                    >
                        Manage Product
                    </NavLink>

                    <NavLink
                        to="/admin/orders"

                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className={({ isActive }) =>
                            isActive
                                ? "active-link"
                                : ""
                        }
                    >
                        Orders
                    </NavLink>

                    <NavLink to="/admin/all-users"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                        Users
                    </NavLink>

                    <NavLink to="/admin/all-Subscribers"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                        Subscribers
                    </NavLink>

                    <NavLink to="/admin/contact-messages"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                        Contact Messages
                    </NavLink>

                    <NavLink to="/admin/membership-management"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                        membership-management
                    </NavLink>


                </div>

            </aside>






        </>







    )
}

export default AdminSidebar
