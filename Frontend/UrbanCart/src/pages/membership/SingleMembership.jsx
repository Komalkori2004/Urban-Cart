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

        <div>

            <h1>
                {
                    singleMembership?.name
                }
            </h1>

            <p>
                {
                    singleMembership?.description
                }
            </p>

            <h2>
                ₹
                {
                    singleMembership?.price
                }
            </h2>

            <p>
                Duration:
                {
                    singleMembership
                    ?.durationInDays
                }
                days
            </p>

        </div>
    );
}

export default SingleMembership;