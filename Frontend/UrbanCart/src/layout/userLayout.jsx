// layout/UserLayout.jsx

import { Outlet } from "react-router-dom";
import UserSidebar from "./userSidebar";

import "./user.css"

function UserLayout() {

    return (

        <div className="container">

            <div className="user-dashboard-layout">

                <UserSidebar />

                <div className="user-dashboard-content">

                    <Outlet />

                </div>

            </div>

        </div>
    );
}

export default UserLayout;