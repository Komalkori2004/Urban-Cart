import {
    FiGrid,
    FiShoppingBag,
    FiHeart,
    FiShoppingCart,
    FiMapPin,
    FiCreditCard,
    FiLogOut,
    FiX,
      FiUser,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./user.css";

function UserSidebar({
    sidebarOpen,
    setSidebarOpen,
    onLogout,
}) {

    const { user } = useSelector(
        (state) => state.auth
    );

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

const menuItems = [
    {
        path: "/dashboard",
        icon: <FiGrid />,
        label: "Dashboard",
        end: true,
    },

    {
        path: "/dashboard/profile-settings",
        icon: <FiUser />,
        label: "Profile Settings",
    },

    {
        path: "/dashboard/orders",
        icon: <FiShoppingBag />,
        label: "Orders",
    },

    {
        path: "/dashboard/wishlist",
        icon: <FiHeart />,
        label: "Wishlist",
    },

    {
        path: "/dashboard/cart",
        icon: <FiShoppingCart />,
        label: "Cart",
    },

    {
        path: "/dashboard/address",
        icon: <FiMapPin />,
        label: "Address",
    },

    {
        path: "/dashboard/membership",
        icon: <FiCreditCard />,
        label: "Membership",
    },

    {
        path: "/dashboard/my-membershipHistory",
        icon: <FiCreditCard />,
        label: "Membership History",
    },
];

    return (
        <>
            {/* Overlay */}

            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}

            <aside
                className={`user-sidebar ${
                    sidebarOpen ? "open" : ""
                }`}
            >
                {/* Close Button */}

                <button
                    className="close-user-sidebar"
                    onClick={closeSidebar}
                >
                    <FiX />
                </button>

                {/* Profile */}

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

                {/* Menu */}

                <div className="sidebar-menu">

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                isActive
                                    ? "active"
                                    : ""
                            }
                        >
                            {item.icon}

                            <span>
                                {item.label}
                            </span>

                        </NavLink>

                    ))}

                </div>

                {/* Logout */}

                <button
                    className="logout-btn"
                    onClick={() => {

                        closeSidebar();

                        if (onLogout) {
                            onLogout();
                        }
                    }}
                >
                    <FiLogOut />

                    <span>
                        Logout
                    </span>

                </button>

            </aside>
        </>
    );
}

export default UserSidebar;