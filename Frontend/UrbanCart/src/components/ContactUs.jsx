


import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";


function ContactUs() {
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

            <form>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Phone Number"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Subject"
                />
              </div>

              <div className="form-group">
                <textarea
                  rows="6"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                className="contact-btn"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ContactUs;