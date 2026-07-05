import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getContact, markAsRead } from "../redux/thunks/contactThunk";
import "./style/contact.css"

function ContactMessages() {

    const dispatch = useDispatch();
    const [selectedMessage, setSelectedMessage] =
        useState(null);

    const [showModal, setShowModal] =
        useState(false);

    const {
        contacts,
        loading,
        error,
    } = useSelector((state) => state.contact);

    useEffect(() => {
        dispatch(getContact());
    }, [dispatch]);



    const handleViewMessage = (contact) => {
        setSelectedMessage(contact);
        setShowModal(true);
    };


    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    const totalMessages = contacts.length;

    const unreadMessages = contacts.filter(
        (contact) => !contact.isRead
    ).length;

    const readMessages = contacts.filter(
        (contact) => contact.isRead
    ).length;



    const handleMarkAsRead = async () => {

        await dispatch(
            markAsRead(selectedMessage._id)
        );

        dispatch(getContact());

        setShowModal(false);
    };


    console.log(contacts);

    return (
        <>

            <div className="contact-header">

                <span className="contact-badge">
                    CUSTOMER SUPPORT
                </span>

                <h1 className="contact-title">
                    Contact Messages
                </h1>

                <p className="contact-subtitle">
                    Manage customer inquiries, support requests and feedback submitted through UrbanCart.
                </p>

            </div>
            {/* Stats Cards */}

            <div className="contact-stats">

                <div className="stat-card">

                    <h4>
                        Total Messages
                    </h4>

                    <h2>
                        {totalMessages}
                    </h2>

                    <p>
                        Customer inquiries
                    </p>

                </div>

                <div className="stat-card">

                    <h4>
                        Unread Messages
                    </h4>

                    <h2>
                        {unreadMessages}
                    </h2>

                    <p>
                        Needs attention
                    </p>

                </div>
                <div className="stat-card">

                    <h4>
                        Read Messages
                    </h4>

                    <h2>
                        {readMessages}
                    </h2>

                    <p>
                        Already reviewed
                    </p>

                </div>

            </div>

            {/* Contact Table */}

            <div className="contact-table-wrapper">

                <div className="contact-summary">

                    <h3>
                        Inbox Overview
                    </h3>

                    <p>

                        You currently have

                        <span>
                            {" "}
                            {unreadMessages}
                        </span>

                        unread customer messages.

                    </p>

                </div>

                <table className="contact-table">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {contacts.map((contact) => (

                            <tr key={contact._id}>

                                <td>{contact.name}</td>

                                <td>{contact.email}</td>

                                <td>{contact.phone}</td>

                                <td>{contact.subject}</td>

                                <td>
                                    <span
                                        className={
                                            contact.isRead
                                                ? "read-badge"
                                                : "unread-badge"
                                        }
                                    >
                                        {contact.isRead
                                            ? "Read"
                                            : "Unread"}
                                    </span>
                                </td>

                                <td>
                                    {new Date(
                                        contact.createdAt
                                    ).toLocaleDateString()}
                                </td>

                                <td>
                                    <button
                                        className="view-btn"
                                        onClick={() =>
                                            handleViewMessage(contact)
                                        }
                                    >
                                        View
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
            <div className="contact-footer">

                <p>

                    Showing

                    <strong>
                        {" "}
                        {contacts.length}
                        {" "}
                    </strong>

                    customer messages.

                </p>

            </div>


            {
                showModal && selectedMessage && (

                    <div className="contact-modal-overlay">

                        <div className="contact-modal">

                            <div className="modal-header">

                                <h2>
                                    Contact Message
                                </h2>

                                <button
                                    className="close-btn"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    ✕
                                </button>

                            </div>
                            <div className="message-meta">

                                <div>

                                    <span>
                                        Customer
                                    </span>

                                    <h4>
                                        {selectedMessage.name}
                                    </h4>

                                </div>

                                <div>

                                    <span>
                                        Received
                                    </span>

                                    <h4>

                                        {
                                            new Date(
                                                selectedMessage.createdAt
                                            ).toLocaleDateString()
                                        }

                                    </h4>

                                </div>

                            </div>

                            <div className="modal-content">

                                <p>
                                    <strong>Name:</strong>{" "}
                                    {selectedMessage.name}
                                </p>

                                <p>
                                    <strong>Email:</strong>{" "}
                                    {selectedMessage.email}
                                </p>

                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {selectedMessage.phone}
                                </p>

                                <p>
                                    <strong>Subject:</strong>{" "}
                                    {selectedMessage.subject}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {selectedMessage.isRead
                                        ? "Read"
                                        : "Unread"}
                                </p>

                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(
                                        selectedMessage.createdAt
                                    ).toLocaleString()}
                                </p>

                                <div className="message-box">

                                    <h4>Message</h4>

                                    <p>
                                        {
                                            selectedMessage.message
                                        }
                                    </p>

                                </div>

                                {
                                    !selectedMessage?.isRead && (
                                        <button
                                            className="mark-read-btn"
                                            onClick={handleMarkAsRead}
                                        >
                                            Mark As Read
                                        </button>
                                    )
                                }

                            </div>

                        </div>

                    </div>

                )
            }


            {
                contacts.length === 0 && (
                    <div className="empty-state">
                        <h3>No Messages Found</h3>
                        <p>No customer inquiries yet.</p>
                    </div>
                )
            }
        </>
    );
}

export default ContactMessages;