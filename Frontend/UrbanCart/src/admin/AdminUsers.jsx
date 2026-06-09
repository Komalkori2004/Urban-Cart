
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../redux/thunks/authThunks";

function AdminUsers() {
    const dispatch = useDispatch()
    const { users, error, loading } = useSelector(state => state.auth)

    useEffect(()=>{
        dispatch(getAllUser())
    },[dispatch])
    console.log(users)

    return (
//         <div>AdminUsers

//             {users.map((user) => (
//     <div key={user._id}>
//         <h3>{user.name}</h3>
//         <p>{user.email}</p>
//     </div>
// ))}
//         </div>

<>
<div className="admin-orders">

    <h1 className="orders-title">
        Manage Users
    </h1>

    <div className="orders-table-wrapper">

        <table className="orders-table">

            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Verified</th>
                    <th>Joined</th>
                </tr>
            </thead>

            <tbody>

                {users?.map((user) => (

                    <tr key={user._id}>

                        <td>
                            {user.name}
                        </td>

                        <td>
                            {user.email}
                        </td>

                        <td>
                            <span
                                className={`status-badge ${user.role}`}
                            >
                                {user.role}
                            </span>
                        </td>

                        <td>
                            {user.isVerified
                                ? "Verified"
                                : "Pending"}
                        </td>

                        <td>
                            {new Date(
                                user.createdAt
                            ).toLocaleDateString()}
                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>

</div>



</>
    )
}

export default AdminUsers