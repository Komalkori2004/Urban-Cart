import {
    FiUser,
    FiShoppingBag,
    FiHeart,
    FiShoppingCart,
    FiMapPin,
    FiSettings,
    FiLogOut,
    FiCreditCard
} from "react-icons/fi";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./user.css"


function UserSidebar() {

    const { user } = useSelector(
        state => state.auth
    );

    return (

        <aside className="user-sidebar">

            <div className="sidebar-profile">

                <div className="sidebar-avatar">
                    {user?.name?.charAt(0)}
                </div>

                <h3>
                    {user?.name}
                </h3>

                <p>
                    {user?.email}
                </p>

            </div>

            <div className="sidebar-menu">

                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/dashboard/orders">
                    Orders
                </NavLink>

                <NavLink to="/dashboard/wishlist">
                    Wishlist
                </NavLink>

                <NavLink to="/dashboard/cart">
                    Cart
                </NavLink>

                <NavLink to="/dashboard/address">
                    Address
                </NavLink>

                <NavLink to="/dashboard/membership">
                    Membership
                </NavLink>

                <NavLink to="/dashboard/membership-history">
                    Membership History
                </NavLink>
                {/* 
<NavLink to="/dashboard/settings">
    Settings
</NavLink> */}

            </div>

            <button className="logout-btn">
                <FiLogOut />
                <span>Logout</span>
            </button>

        </aside>
    );
}

export default UserSidebar;