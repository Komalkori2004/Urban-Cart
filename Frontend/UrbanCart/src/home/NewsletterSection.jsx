

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../home/style/NewsletterSection.css";

import { toast } from "react-toastify";

import {subscribeNewsletter } from "../redux/thunks/newsletterThunk"

import {
  resetNewsletterState,
} from "../redux/feature/newsletterSlice";

function NewsletterSection() {

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading ,success } = useSelector((state) => state.newsletter);



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error(
        "Email is required"
      );
    }

    dispatch(
      subscribeNewsletter(email)
    );

    
  };

  useEffect(() => {
  if (success) {
    setEmail("");
    dispatch(resetNewsletterState());
  }
}, [success, dispatch]);
  return (
    <section className="newsletter">
      <div className="container">

        <div className="newsletter-card">

          <span className="newsletter-tag">
            EXCLUSIVE ACCESS
          </span>

          <h2>
            Become An Insider
          </h2>

          <p>
            Join the UrbanCart circle and receive early
            access to new collections, private offers,
            luxury drops, and curated style inspiration.
          </p>

          <form
            className="newsletter-form"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
            <button
              type="submit"
              disabled={loading}
            >
              {
                loading
                  ? "Joining..."
                  : "Join The Circle →"
              }
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default NewsletterSection;

