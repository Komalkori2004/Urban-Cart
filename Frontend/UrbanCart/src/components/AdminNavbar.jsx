import {
    FiBell,
    FiLogOut,
    FiSearch
} from "react-icons/fi";

import "./style/adminNavbar.css";
import { Link } from "react-router-dom";

function AdminNavbar({
    title,
    subtitle,
    setSidebarOpen
}) {

    return (

       <header className="admin-navbar">

    <div className="admin-navbar-left">
    <button
    className="admin-sidebar-toggle"
    onClick={() => setSidebarOpen(true)}
>
    ❯
</button>

        <Link
            to="/"
            className="admin-brand"
        >
            <img
                src="/logo/nav-logo.png"
                alt="UrbanCart"
            />
        </Link>

        <div className="admin-divider"></div>

        <div className="admin-page-info">

            <h2>{title}</h2>

            <p>{subtitle}</p>

        </div>

    </div>


    {/* <div className="admin-navbar-right">

        <button className="admin-nav-icon">
            <FiSearch />
        </button>

        <button className="admin-nav-icon">
            <FiBell />
        </button>

        <div className="admin-profile">

            <div className="admin-avatar">
                A
            </div>

            <div>
                <h4>Admin</h4>
                <span>Super Admin</span>
            </div>

        </div>

    </div> */}

</header>
    );
}

export default AdminNavbar;