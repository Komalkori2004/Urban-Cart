
import React from 'react'
import { NavLink } from 'react-router-dom'
import "./style/adminSidebar.css"

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {



    return (
        <>
            <div
                className={`admin-sidebar ${sidebarOpen
                    ? "open"
                    : ""
                    }`}
            >

                <button
                    className="close-sidebar"
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                >
                    ✕
                </button>
                <NavLink to="/">
                    <h2 className='sidebar-logo'>
                        urbanCart
                    </h2>
                </NavLink>


                <nav className="sidebar-links">
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

                    {/* <NavLink to="/admin/create-membership"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                  create membership
                    </NavLink>

                    <NavLink to="/admin/edit-membership"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                  update membership 
                    </NavLink>

                    
                    <NavLink to="/admin/membership-stats"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                 membership stats
                    </NavLink> */}


                    <NavLink to="/admin/membership-management"
                     onClick={() =>
                            setSidebarOpen(false)
                        }
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                        membership-management
                    </NavLink>







                </nav>


            </div>






        </>
    )
}

export default AdminSidebar