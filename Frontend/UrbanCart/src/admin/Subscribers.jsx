
    import { getSubscribers } from "../redux/thunks/newsletterThunk";
    import { useDispatch,useSelector } from "react-redux";
    import { useEffect } from "react";

    import "./style/admin.css"

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

    <div className="subscribers-container">

        <div className="subscribers-header">

            <h1>
                Newsletter Subscribers
            </h1>

            <p>
                Manage and view all newsletter
                subscribers.
            </p>

        </div>

        <div className="subscribers-grid">

            {
                subscribers?.map(
                    (subscriber) => (

                        <div
                            key={subscriber._id}
                            className="subscriber-card"
                        >

                            <h3>
                                Subscriber
                            </h3>

                            <p>
                                {
                                    subscriber.email
                                }
                            </p>

                        </div>
                    )
                )
            }

        </div>

    </div>
);
    }

    export default Subscribers