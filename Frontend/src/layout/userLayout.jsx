import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";

import "./user.css";

function UserLayout() {

    const [sidebarOpen, setSidebarOpen]
        = useState(false);

    return (

        <div className="user-dashboard-layout">

            <UserSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="user-dashboard-content">

                <button
                    className="user-sidebar-toggle"
                    onClick={() => setSidebarOpen(true)}
                >
                    <span>❯</span>
                </button>

                <Outlet />

            </div>

        </div>
    );
}

export default UserLayout;