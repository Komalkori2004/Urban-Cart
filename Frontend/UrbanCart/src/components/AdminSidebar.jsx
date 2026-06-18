
import React from 'react'
import { NavLink } from 'react-router-dom'
import "./style/adminSidebar.css"

const AdminSidebar = () => {
    return (
        <>
            <div className="admin-sidebar">
                <h2 className='sidebar-logo'>
                    urbanCart
                </h2>

                <nav className="sidebar-links">
                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            isActive ? "active-link" : ''
                        }

                    >Dashboard</NavLink>

                    <NavLink
                        to="/admin/add-product"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ''
                        }
                    >
                        add-Product
                    </NavLink>
                          <NavLink to="/admin/add-Category"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                        Add-Category
                    </NavLink>

                    <NavLink
                        to="/admin/all-product"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ''
                        }
                    >
                        Manage Product
                    </NavLink>

                    <NavLink to="/admin/orders"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                        Orders
                    </NavLink>

                    <NavLink to="/admin/all-users"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                        Users
                    </NavLink>

                         <NavLink to="/admin/all-Subscribers"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }>
                      Subscribers
                    </NavLink>



                </nav>


            </div>






        </>
    )
}

export default AdminSidebar