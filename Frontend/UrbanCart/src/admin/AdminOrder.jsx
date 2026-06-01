import React from "react";

const AdminOrder = () => {
  return (
    <div className="admin-orders">
      <h1 className="orders-title">Manage Orders</h1>

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#12345</td>
              <td>Komal</td>
              <td>₹4000</td>
              <td>Pending</td>
              <td>COD</td>
              <td>
                <button>View</button>
              </td>
            </tr>

            <tr>
              <td>#12346</td>
              <td>User</td>
              <td>₹2500</td>
              <td>Processing</td>
              <td>COD</td>
              <td>
                <button>View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrder;