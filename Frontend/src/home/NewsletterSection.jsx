import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../home/style/NewsletterSection.css";

import { toast } from "react-toastify";

import { subscribeNewsletter } from "../redux/thunks/newsletterThunk";

import {
  resetNewsletterState,
} from "../redux/feature/newsletterSlice";

function NewsletterSection() {

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { loading, success } =
    useSelector((state) => state.newsletter);

  const handleSubmit = (e) => {

    e.preventDefault();

    const trimmedEmail =
      email.trim().toLowerCase();

    if (!trimmedEmail) {
      return toast.error(
        "Email is required"
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return toast.error(
        "Please enter a valid email"
      );
    }

    dispatch(
      subscribeNewsletter(
        trimmedEmail
      )
    );
  };

  useEffect(() => {

    if (success) {

      toast.success(
        "Welcome to UrbanCart"
      );

      setEmail("");

      dispatch(
        resetNewsletterState()
      );
    }

  }, [success, dispatch]);

  return (

    <section className="newsletter">

      <div className="container">

        <div className="newsletter-card">

          <div className="newsletter-badge-wrapper">

            <span className="badge-line"></span>

            <span className="newsletter-badge">
              ✦ EXCLUSIVE ACCESS ✦
            </span>

            <span className="badge-line"></span>

          </div>

          <h2 className="newsletter-title">
            Join The UrbanCart Circle
          </h2>

          <p className="newsletter-description">
            Discover private launches, luxury collections,
            curated fashion inspiration and members-only
            experiences.
          </p>

          <form className="newsletter-form"
            onSubmit={handleSubmit}>

            <div className="newsletter-input">

              <span className="mail-icon">
                ✉
              </span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <button
              type="submit"
              className="newsletter-btn"
            >
              {loading ? "Joining..." : "Join The Circle"}
            </button>

          </form>

          <p className="newsletter-privacy">
            We respect your privacy.
            Unsubscribe anytime.
          </p>

        </div>

      </div>

    </section>
  );
}

export default NewsletterSection;