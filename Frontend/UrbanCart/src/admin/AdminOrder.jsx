
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus, getOrderById } from "../redux/thunks/orderThunks";
import "./style/admin.css"






const AdminOrder = () => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const { order, selectedOrder, loading, error } = useSelector((state) => state.order)
  console.log("Selected Order:", selectedOrder)


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
    <>
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
                      <button
                        onClick={() => {

                          dispatch(
                            getOrderById(item._id)
                          )
                          setShowModal(true)
                        }}
                      >
                        View
                      </button>

                      <select
                        className="order-status-select"
                        value={item.orderStatus}
                        onChange={(e) =>
                          dispatch(
                            updateOrderStatus({
                              id: item._id,
                              orderStatus: e.target.value
                            })
                          )
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                    </td>

                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>



      {
        showModal && selectedOrder && (

          <div className="order-modal">

            <div className="order-modal-content">

              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                ✖️
              </button>
              <h3 className="order-section-title">
                Customer Information
              </h3>

              <p><strong>Name:</strong> {selectedOrder.shippingAddress?.fullName}</p>

              <p><strong>Phone:</strong> {selectedOrder.shippingAddress?.phone}</p>

              <hr />

              <h3>Order Summary</h3>

              <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>

              <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>

              <p>
                <strong>Status:</strong>

                <span
                  className={`status-badge ${selectedOrder.orderStatus.toLowerCase()}`}
                >
                  {selectedOrder.orderStatus}
                </span>
              </p>

              <h3>Products</h3>

              <div className="order-products">

                {
                  selectedOrder?.items?.map((item) => (

                    <div
                      key={item._id}
                      className="order-product"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>

                        <h4>{item.name}</h4>

                        <p>
                          Qty: {item.quantity}
                        </p>

                        <p>
                          ₹{item.price}
                        </p>

                      </div>

                    </div>
                  ))
                }
                <div className="address-card">

                  <h3>Shipping Address</h3>

                  <p>{selectedOrder.shippingAddress?.addressLine1}</p>

                  <p>{selectedOrder.shippingAddress?.addressLine2}</p>

                  <p>
                    {selectedOrder.shippingAddress?.city},
                    {selectedOrder.shippingAddress?.state}
                  </p>

                  <p>{selectedOrder.shippingAddress?.country}</p>

                </div>

              </div>

            </div>

          </div>
        )
      }
    </>
  );
};

export default AdminOrder;