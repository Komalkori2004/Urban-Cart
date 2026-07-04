
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
            <div className="my-orders-page">

                <div className="container">

                    {/* HERO */}

                    <div className="orders-hero">

                        <span className="orders-badge">
                            LUXURY PURCHASE HISTORY
                        </span>

                        <h1 className="orders-title">
                            My Orders
                        </h1>

                        <p className="orders-description">
                            Track and manage your premium purchases.
                        </p>

                    </div>


                    {/* STATS */}

                    <div className="orders-stats">

                        <div className="orders-stat-card">
                            <h2>
                                {myOrders?.length || 0}
                            </h2>
                            <p>Total Orders</p>
                        </div>

                        <div className="orders-stat-card">
                            <h2>
                                {
                                    myOrders?.filter(
                                        order =>
                                            order.orderStatus ===
                                            "Processing"
                                    ).length
                                }
                            </h2>
                            <p>Processing</p>
                        </div>

                        <div className="orders-stat-card">
                            <h2>
                                ₹{
                                    myOrders?.reduce(
                                        (acc, order) =>
                                            acc +
                                            order.totalAmount,
                                        0
                                    )
                                }
                            </h2>
                            <p>Total Spent</p>
                        </div>

                    </div>


                    {/* EMPTY */}

                    {!loading &&
                        myOrders.length === 0 && (

                            <div className="empty-orders">

                                <h2>
                                    No Orders Yet
                                </h2>

                                <p>
                                    Your luxury purchases
                                    will appear here.
                                </p>

                            </div>

                        )}


                    {/* ORDERS */}

                    <div className="orders-grid">

                        {myOrders?.map((order) => (

                            <div
                                key={order._id}
                                className="luxury-order-card"
                            >

                                {/* HEADER */}

                                <div className="order-header">

                                    <div>

                                        <p className="order-number">
                                            Order #
                                            {
                                                order._id.slice(
                                                    -8
                                                )
                                            }
                                        </p>

                                        <span className="order-date">

                                            {
                                                new Date(
                                                    order.createdAt
                                                )
                                                    .toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day:
                                                                "numeric",
                                                            month:
                                                                "short",
                                                            year:
                                                                "numeric"
                                                        }
                                                    )
                                            }

                                        </span>

                                    </div>

                                    <span
                                        className={`status-badge ${order.orderStatus.toLowerCase()}`}
                                    >
                                        {
                                            order.orderStatus
                                        }
                                    </span>

                                </div>


                                {/* BODY */}

                                <div className="order-body">

                                    <div className="order-image">

                                        <img
                                            src={
                                                order.items?.[0]
                                                    ?.image
                                            }
                                            alt={
                                                order.items?.[0]
                                                    ?.name
                                            }
                                            loading="lazy"
                                        />

                                    </div>

                                    <div className="order-content">

                                        <h3>
                                            {
                                                order.items?.[0]
                                                    ?.name
                                            }
                                        </h3>

                                        {
                                            order.items
                                                ?.length >
                                            1 && (
                                                <span className="more-items">

                                                    +
                                                    {
                                                        order
                                                            .items
                                                            .length -
                                                        1
                                                    }

                                                    more items

                                                </span>
                                            )
                                        }

                                        <div className="payment-status">

                                            <span>

                                                Payment :

                                            </span>

                                            <span
                                                className={`payment-badge ${order.paymentStatus ===
                                                    "Paid"
                                                    ? "paid"
                                                    : "pending"
                                                    }`}
                                            >
                                                {
                                                    order.paymentStatus
                                                }
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                {/* STATUS */}

                                <div className="status-tracker">

                                    <div className="step active">
                                        <span></span>
                                        <p>
                                            Ordered
                                        </p>
                                    </div>

                                    <div
                                        className={`step ${[
                                            "Processing",
                                            "Shipped",
                                            "Delivered"
                                        ].includes(
                                            order.orderStatus
                                        )
                                            ? "active"
                                            : ""
                                            }`}
                                    >
                                        <span></span>
                                        <p>
                                            Processing
                                        </p>
                                    </div>

                                    <div
                                        className={`step ${[
                                            "Shipped",
                                            "Delivered"
                                        ].includes(
                                            order.orderStatus
                                        )
                                            ? "active"
                                            : ""
                                            }`}
                                    >
                                        <span></span>
                                        <p>
                                            Shipped
                                        </p>
                                    </div>

                                    <div
                                        className={`step ${order.orderStatus ===
                                            "Delivered"
                                            ? "active"
                                            : ""
                                            }`}
                                    >
                                        <span></span>
                                        <p>
                                            Delivered
                                        </p>
                                    </div>

                                </div>


                                {/* FOOTER */}

                                <div className="order-footer">

                                    <div>

                                        <p className="total-price">

                                            ₹
                                            {
                                                order.totalAmount
                                            }

                                        </p>

                                        <span>
                                            Total Amount
                                        </span>

                                    </div>

                                    <button
                                        className="order-details-btn"
                                        onClick={() => {

                                            dispatch(
                                                getOrderById(
                                                    order._id
                                                )
                                            );

                                            setShowModal(
                                                true
                                            );

                                        }}
                                    >
                                        View Details
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* MODAL */}

                    {
                        showModal &&
                        selectedOrder && (

                            <div className="order-modal">

                                <div className="order-modal-content">


                                    <button
                                        className="close-modal"

                                        onClick={() => setShowModal(false)}
                                    >
                                        ✖️
                                    </button>
                                    <div className="modal-header">

                                        <div>
                                            <h2>
                                                Order #{selectedOrder._id.slice(-8)}
                                            </h2>

                                            <p>
                                                Placed on{" "}
                                                {
                                                    new Date(selectedOrder.createdAt)
                                                        .toLocaleDateString("en-IN")
                                                }
                                            </p>
                                        </div>

                                    </div>
                                    <div className="modal-status-tracker">

                                        <div className="status-step active">
                                            <span></span>
                                            <p>Ordered</p>
                                        </div>

                                        <div
                                            className={`status-step ${["Processing", "Shipped", "Delivered"]
                                                .includes(selectedOrder.orderStatus)
                                                ? "active"
                                                : ""
                                                }`}
                                        >
                                            <span></span>
                                            <p>Processing</p>
                                        </div>

                                        <div
                                            className={`status-step ${["Shipped", "Delivered"]
                                                .includes(selectedOrder.orderStatus)
                                                ? "active"
                                                : ""
                                                }`}
                                        >
                                            <span></span>
                                            <p>Shipped</p>
                                        </div>

                                        <div
                                            className={`status-step ${selectedOrder.orderStatus === "Delivered"
                                                ? "active"
                                                : ""
                                                }`}
                                        >
                                            <span></span>
                                            <p>Delivered</p>
                                        </div>

                                    </div>
                                    <div className="info-grid">


                                        <div className="info-card">

                                            <h3>Customer Information</h3>

                                            <p>
                                                <strong>Name:</strong>
                                                {selectedOrder.shippingAddress?.fullName}
                                            </p>

                                            <p>
                                                <strong>Phone:</strong>
                                                {selectedOrder.shippingAddress?.phone}
                                            </p>

                                        </div>

                                        <div className="info-card">

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

                                        </div>

                                    </div>

                                    <hr />
                                    <div className="section-heading">

                                        <span className="section-line"></span>

                                        <h3>
                                            Products
                                        </h3>

                                    </div>

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
                                                    loading="lazy"
                                                />
                                                <div className="product-details">

                                                    <h4>{item.name}</h4>

                                                    <div className="product-meta">

                                                        <span>
                                                            Qty: {item.quantity}
                                                        </span>

                                                        <span>
                                                            ₹{item.price}
                                                        </span>

                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="section-heading">

                                        <span className="section-line"></span>

                                        <h3>
                                            Order Summary
                                        </h3>

                                    </div>

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

                                            <span
                                                className={`payment-chip ${selectedOrder.paymentStatus === "Paid"
                                                    ? "paid"
                                                    : "pending"
                                                    }`}
                                            >
                                                {selectedOrder.paymentStatus}
                                            </span>
                                        </p>
                                        {selectedOrder.paymentInfo?.id && (
                                            <div className="transaction-badge">

                                                <span>Transaction ID</span>

                                                <p>
                                                    {selectedOrder.paymentInfo.id}
                                                </p>

                                            </div>
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

            </div>
        </>
    );

}

export default MyOrders