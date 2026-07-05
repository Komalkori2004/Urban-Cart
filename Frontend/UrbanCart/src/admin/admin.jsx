import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllproduct } from "../redux/thunks/productThunks";

import { Link } from "react-router-dom";
import {
    FiPackage,
    FiTrendingUp,
    FiAlertTriangle,
    FiXCircle
} from "react-icons/fi";

import "./style/admin.css";

function AdminProfile() {

    const dispatch = useDispatch();

    const { products = [] } =
        useSelector(state => state.products);

    useEffect(() => {
        dispatch(getAllproduct());
    }, [dispatch]);

    const totalProducts =
        products.length;

    const inStockProducts =
        products.filter(
            product => product.stock > 0
        ).length;

    const outOfStockProducts =
        products.filter(
            product => product.stock === 0
        ).length;

    const lowStockProducts =
        products.filter(
            product =>
                product.stock > 0 &&
                product.stock <= 5
        ).length;

    return (

        <div className="admin-dashboard">

            {/* HERO */}

            <section className="admin-hero">

                <div>

                    <h5>
                        ADMIN PANEL
                    </h5>

                    <h1>
                        Welcome Back,
                        <span> Admin</span>
                    </h1>

                    <p>
                        Manage your UrbanCart
                        inventory, orders and
                        customers efficiently.
                    </p>

                </div>

            </section>


            {/* STATS */}

            <section className="admin-stats">

                <div className="admin-stat-card">

                    <FiPackage />

                    <h3>
                        {totalProducts}
                    </h3>

                    <p>
                        Total Products
                    </p>

                </div>


                <div className="admin-stat-card">

                    <FiTrendingUp />

                    <h3>
                        {inStockProducts}
                    </h3>

                    <p>
                        In Stock
                    </p>

                </div>


                <div className="admin-stat-card">

                    <FiAlertTriangle />

                    <h3>
                        {lowStockProducts}
                    </h3>

                    <p>
                        Low Stock
                    </p>

                </div>


                <div className="admin-stat-card">

                    <FiXCircle />

                    <h3>
                        {outOfStockProducts}
                    </h3>

                    <p>
                        Out Of Stock
                    </p>

                </div>

            </section>


            {/* INVENTORY OVERVIEW */}

            <section className="inventory-overview">

                <h2>
                    Inventory Overview
                </h2>

                <div className="inventory-list">

                    <div>
                        <span>
                            Total Products
                        </span>

                        <strong>
                            {totalProducts}
                        </strong>
                    </div>

                    <div>
                        <span>
                            Available Stock
                        </span>

                        <strong>
                            {inStockProducts}
                        </strong>
                    </div>

                    <div>
                        <span>
                            Low Inventory
                        </span>

                        <strong>
                            {lowStockProducts}
                        </strong>
                    </div>

                    <div>
                        <span>
                            Out Of Stock
                        </span>

                        <strong>
                            {outOfStockProducts}
                        </strong>
                    </div>

                </div>

            </section>


            {/* QUICK ACTIONS */}

         <section className="admin-actions">

    <h2>
        Quick Access
    </h2>

    <div className="action-grid">

        <Link
            to="/admin/add-product"
            className="action-card"
        >
            <h3>Add Product</h3>
            <p>Create new products</p>
        </Link>

        <Link
            to="/admin/orders"
            className="action-card"
        >
            <h3>Orders</h3>
            <p>Manage customer orders</p>
        </Link>

        <Link
            to="/admin/all-users"
            className="action-card"
        >
            <h3>Users</h3>
            <p>View all users</p>
        </Link>

        <Link
            to="/admin/membership-management"
            className="action-card"
        >
            <h3>Membership</h3>
            <p>Manage subscriptions</p>
        </Link>

        <Link
            to="/admin/all-product"
            className="action-card"
        >
            <h3>Products</h3>
            <p>Manage inventory</p>
        </Link>

        <Link
            to="/admin/contact-messages"
            className="action-card"
        >
            <h3>Messages</h3>
            <p>Customer support</p>
        </Link>

        <Link
            to="/admin/all-subscribers"
            className="action-card"
        >
            <h3>Subscribers</h3>
            <p>Newsletter users</p>
        </Link>

        <Link
            to="/admin/add-category"
            className="action-card"
        >
            <h3>Categories</h3>
            <p>Manage categories</p>
        </Link>

    </div>

</section>

        </div>
    );
}

export default AdminProfile;