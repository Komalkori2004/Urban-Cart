
import React from 'react'
import { NavLink } from 'react-router-dom'

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

                    <NavLink
                        to="/admin/all-product"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ''
                        }
                    >
                        Manage Product
                    </NavLink>

                    <NavLink to="#">
                        orders

                    </NavLink>
                    <NavLink to="#">
                        users
                    </NavLink>



                </nav>


            </div>






        </>
    )
}

export default AdminSidebar