
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders, getOrderById } from "../redux/thunks/orderThunks";

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
            <div className="my-orders-container">
                <h2>My Orders</h2>

                {loading && <p>Loading...</p>}

                {error && <p>{error}</p>}

                {!loading && myOrders.length === 0 && (
                    <p>No Orders Found</p>
                )}

                {myOrders?.map((order) => (
                    <div
                        key={order._id}
                        className="order-card"
                    >
                        <h4>
                            Order #{order._id.slice(-6)}
                        </h4>

                        <p>
                            Total: ₹{order.totalAmount}
                        </p>

                        <p>
                            Status: {order.orderStatus}
                        </p>

                        <p>
                            Payment: {order.paymentMethod}
                        </p>

                        <p>
                            Date:
                            {" "}
                            {new Date(order.createdAt)
                                .toLocaleDateString()}
                        </p>

                        <button
                            onClick={() => {
                                dispatch(getOrderById(order._id))
                                setShowModal(true)
                            }}>
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {
                showModal && selectedOrder && (
                    <div className="order-modal">

                        <button
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>

                        <h3>Order Details</h3>

                        <p>
                            Order ID:
                            {selectedOrder._id}
                        </p>

                        <p>
                            Total:
                            ₹{selectedOrder.totalAmount}
                        </p>

                        <p>
                            Status:
                            {selectedOrder.orderStatus}
                        </p>

                        <p>
                            Payment:
                            {selectedOrder.paymentMethod}
                        </p>

                    </div>
                )
            }

        </>


    )



}

export default MyOrders