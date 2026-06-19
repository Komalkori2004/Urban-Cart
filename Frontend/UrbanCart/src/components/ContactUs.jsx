


import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../redux/thunks/contactThunk";
import { resetContactState } from "../redux/feature/contactSlice"
import "./style/contact.css"
function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const dispatch = useDispatch();

    const {
        loading,
        success,
    } = useSelector(
        (state) => state.contact
    );


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            createContact(formData)
        );
    };

    useEffect(() => {

        if (success) {

            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });

            dispatch(
                resetContactState()
            );
        }

    }, [success, dispatch]);
    return (
        <section className="contact-page">

            <div className="contact-hero">
                <div className="container">
                    <span className="contact-tag">
                        GET IN TOUCH
                    </span>

                    <h1>
                        Contact Us
                    </h1>

                    <p>
                        Have a question about your order, products,
                        or shopping experience? Our team is here
                        to assist you.
                    </p>
                </div>
            </div>

            <div className="container">

                <div className="contact-wrapper">

                    {/* Contact Information */}

                    <div className="contact-info">

                        <h2>
                            Let's Connect
                        </h2>

                        <p>
                            We'd love to hear from you. Reach out to us
                            through any of the channels below.
                        </p>

                        <div className="info-card">

                            <FaMapMarkerAlt />

                            <div>
                                <h4>Address</h4>
                                <p>
                                    Mohali, Punjab, India
                                </p>
                            </div>

                        </div>

                        <div className="info-card">

                            <FaPhoneAlt />

                            <div>
                                <h4>Phone</h4>
                                <p>
                                    +91 98765 43210
                                </p>
                            </div>

                        </div>

                        <div className="info-card">

                            <FaEnvelope />

                            <div>
                                <h4>Email</h4>
                                <p>
                                    support@urbancart.com
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Contact Form */}

                    <div className="contact-form-card">

                        <h2>
                            Send Us A Message
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}

                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Subject"
                                />
                            </div>

                            <div className="form-group">
                                <textarea
                                    rows="6"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="contact-btn"
                                disabled={loading}
                            >
                                {
                                    loading
                                        ? "Sending..."
                                        : "Send Message"
                                }
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default ContactUs;