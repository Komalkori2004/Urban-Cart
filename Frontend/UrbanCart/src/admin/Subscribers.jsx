
import { getSubscribers } from "../redux/thunks/newsletterThunk";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";

function Subscribers() {

    const dispatch = useDispatch();

    const {
        subscribers,
        loading,
    } = useSelector(
        (state) => state.newsletter
    );

    useEffect(() => {
        dispatch(getSubscribers());
    }, [dispatch]);

    return (
        <div>

            <h2>
                Newsletter Subscribers
            </h2>

            {subscribers.map((subscriber) => (
                <div key={subscriber._id}>
                    {subscriber.email}
                </div>
            ))}

        </div>
    );
}

export default Subscribers