
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders, getOrderById, cancleOrder } from "../redux/thunks/orderThunks";

import "../style/myOrder.css"

const MyOrders = () => {

    const dispatch = useDispatch()


    const { myOrders, loading, error, selectedOrder } = useSelector((state) => state.order)

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(getMyOrders())
    }, [dispatch])
    console.log("My Orders:", myOrders);


    console.log("Selected Order:", selectedOrder);
    return (
        <>
            <div className="container">

                <div className="my-orders-container">
                    <h2>My Orders</h2>



                    {!loading && myOrders.length === 0 && (
                        <div className="empty-orders">
                            <h3>No Orders Yet</h3>
                            <p>Your orders will appear here.</p>
                        </div>
                    )}

                    {myOrders?.map((order) => (
                        <div className="order-card">

                            <div className="order-main" key={order._id}>

                                <div className="order-image">
                                    <img
                                        src={order.items?.[0]?.image}
                                        alt={order.items?.[0]?.name}
                                    />
                                </div>

                                <div className="order-info">

                                    <div className="order-card-header">

                                        <div>
                                            <h4>
                                                {order.items?.[0]?.name}
                                            </h4>

                                            {order.items?.length > 1 && (
                                                <span className="more-items">
                                                    +{order.items.length - 1} more items
                                                </span>
                                            )}
                                        </div>

                                        <span
                                            className={`status-badge ${order.orderStatus.toLowerCase()}`}
                                        >
                                            {order.orderStatus}
                                        </span>

                                    </div>

                                    <p className="order-id">
                                        Order #{order._id.slice(-6)}
                                    </p>

                                    <p className="order-date">
                                        {new Date(order.createdAt).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric"
                                            }
                                        )}
                                    </p>

                                    {/* STATUS TRACKER */}

                                    <div className="status-tracker">

                                        <div className={`step active`}>
                                            <span></span>
                                            <p>Ordered</p>
                                        </div>

                                        <div
                                            className={`step ${["Processing", "Shipped", "Delivered"]
                                                    .includes(order.orderStatus)
                                                    ? "active"
                                                    : ""
                                                }`}
                                        >
                                            <span></span>
                                            <p>Processing</p>
                                        </div>

                                        <div
                                            className={`step ${["Shipped", "Delivered"]
                                                    .includes(order.orderStatus)
                                                    ? "active"
                                                    : ""
                                                }`}
                                        >
                                            <span></span>
                                            <p>Shipped</p>
                                        </div>

                                        <div
                                            className={`step ${order.orderStatus === "Delivered"
                                                    ? "active"
                                                    : ""
                                                }`}
                                        >
                                            <span></span>
                                            <p>Delivered</p>
                                        </div>

                                    </div>

                                    <div className="order-bottom">

                                        <div>

                                            <p className="total-price">
                                                ₹{order.totalAmount}
                                            </p>

                                            <span
                                                className={`payment-badge ${order.paymentStatus === "Paid"
                                                        ? "paid"
                                                        : "pending"
                                                    }`}
                                            >
                                                {order.paymentStatus}
                                            </span>

                                        </div>

                                        <button
                                            onClick={() => {
                                                dispatch(getOrderById(order._id));
                                                setShowModal(true);
                                            }}
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}
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
                                <h3>Customer Information</h3>

                                <p>
                                    <strong>Name:</strong>{" "}
                                    {selectedOrder.shippingAddress?.fullName}
                                </p>

                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {selectedOrder.shippingAddress?.phone}
                                </p>

                                <hr />

                                <h3>Shipping Address</h3>

                                <p>
                                    {selectedOrder.shippingAddress?.addressLine1}
                                </p>

                                <p>
                                    {selectedOrder.shippingAddress?.addressLine2}
                                </p>

                                <p>
                                    {selectedOrder.shippingAddress?.city},
                                    {" "}
                                    {selectedOrder.shippingAddress?.state}
                                </p>

                                <p>
                                    {selectedOrder.shippingAddress?.pincode}
                                </p>

                                <p>
                                    {selectedOrder.shippingAddress?.country}
                                </p>

                                <hr />
                                <h3>Products</h3>

                                {
                                    selectedOrder?.items?.map((item) => (

                                        <div
                                            key={item._id}
                                            className="order-product"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                width="80"
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
                                <h3>Order Summary</h3>

                                <div className="order-summary">

                                    <p>
                                        <strong>Order ID:</strong>
                                        {selectedOrder._id.slice(-8)}
                                    </p>

                                    <p>
                                        <strong>Total Amount:</strong>
                                        ₹{selectedOrder.totalAmount}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>
                                        {selectedOrder.orderStatus}
                                    </p>

                                    <p>
                                        <strong>Payment Method:</strong>
                                        {selectedOrder.paymentMethod}
                                    </p>
                                    <p>
                                        <strong>Payment Status:</strong>
                                        {selectedOrder.paymentStatus}
                                    </p>
                                    {selectedOrder.paymentInfo?.id && (
                                        <p>
                                            <strong>Transaction ID:</strong>
                                            {selectedOrder.paymentInfo.id}
                                        </p>
                                    )}

                                </div>
                                {
                                    selectedOrder?.orderStatus !== "Delivered" &&
                                    selectedOrder?.orderStatus !== "Cancelled" && (

                                        <button
                                            className="cancel-order-btn"
                                            onClick={
                                                () => {
                                                    dispatch(cancleOrder(selectedOrder._id))
                                                }
                                            }

                                        >
                                            Cancel Order
                                        </button>

                                    )
                                }
                            </div>
                        </div>

                    )
                }
            </div>

        </>


    )



}

export default MyOrders