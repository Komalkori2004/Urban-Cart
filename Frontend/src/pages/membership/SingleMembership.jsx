import React, {
    useEffect
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useParams
} from "react-router-dom";

import {
    getSingleMembership
} from "../../redux/thunks/membershipThunk";

function SingleMembership() {

    const { slug } =useParams();
        

    const dispatch =   useDispatch();
      

    const {singleMembership,singleLoading,singleError } = useSelector( state => state.membership);

   useEffect(() => {

    dispatch(
        getSingleMembership(
            slug
        )
    );

}, [dispatch, slug]);

    if (singleLoading)
        return <h2>Loading...</h2>;

    if (singleError)
        return <h2>{singleError}</h2>;

 return (

    <div className="membership-container">

        <div className="membership-header">

            <h1>
                Membership Details
            </h1>

            <p>
                Explore premium benefits and
                exclusive rewards.
            </p>

        </div>

        <div className="membership-grid">

            <div
                className={`membership-card ${
                    singleMembership?.isPopular
                        ? "popular"
                        : ""
                }`}
            >

                {
                    singleMembership?.isPopular && (
                        <span className="membership-badge">
                            Popular
                        </span>
                    )
                }

                <h2 className="membership-name">
                    {
                        singleMembership?.name
                    }
                </h2>

                <p className="membership-description">
                    {
                        singleMembership?.description
                    }
                </p>

                <div className="membership-price">

                    <h2>
                        ₹{
                            singleMembership?.price
                        }
                    </h2>

                    <span>
                        /
                        {
                            singleMembership
                                ?.durationInDays
                        }
                        Days
                    </span>

                </div>

                <ul className="membership-features">

                    {
                        singleMembership?.features?.map(
                            (feature, index) => (
                                <li key={index}>
                                    ✓ {feature}
                                </li>
                            )
                        )
                    }

                    <li>
                        Discount:
                        {
                            singleMembership
                                ?.discountPercentage
                        }%
                    </li>

                    <li>
                        Free Shipping:
                        {
                            singleMembership
                                ?.freeShipping
                                ? " Yes"
                                : " No"
                        }
                    </li>

                    <li>
                        Priority Support:
                        {
                            singleMembership
                                ?.prioritySupport
                                ? " Yes"
                                : " No"
                        }
                    </li>

                    <li>
                        Early Access:
                        {
                            singleMembership
                                ?.earlyAccess
                                ? " Yes"
                                : " No"
                        }
                    </li>

                </ul>

                <button
                    className="membership-btn"
                >
                    Become Premium
                </button>

            </div>

        </div>

    </div>
);
}

export default SingleMembership;