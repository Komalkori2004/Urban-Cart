
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrders } from "../redux/thunks/orderThunks";
import "./style/admin.css"






const AdminOrder = () => {
  const dispatch = useDispatch()
  const { order, loading, error } = useSelector((state) => state.order)
  const state = useSelector((state) => state);

  console.log(state);
  useEffect(() => {
    console.log("Fetching orders...", order)

    dispatch(getAllOrders())
  }, [dispatch])

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }


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

            {
              order?.map((item) => (

                <tr key={item._id}>

                  <td>
                    {item._id.slice(-6)}
                  </td>

                  <td>
                    {item.shippingAddress?.fullName}
                  </td>

                  <td>
                    ₹{item.totalAmount}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${item.orderStatus.toLowerCase()}`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>
                  <td>
                    {item.paymentMethod}
                  </td>

                  <td>

                    <button>
                      View
                    </button>

                  </td>

                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrder;