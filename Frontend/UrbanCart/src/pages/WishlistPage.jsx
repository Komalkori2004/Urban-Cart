

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { getWishlist, removeWishlist } from "../redux/thunks/wishlistThunks";


const WishlistPage = () => {


    const dispatch = useDispatch()
    const { wishlist, loading, error } = useSelector((state) => state.wishlist)


    useEffect(() => {
        dispatch(getWishlist())
    }, [dispatch])

    return (<>

        <div>

            <h1>
                My Wishlist
            </h1>

            {wishlist?.map((product) => (

                <div className="wishlist-card" key={product._id}>

                    <img
                        src={product.images[0]?.url}
                        alt={product.name}
                    />

                    <h3>{product.name}</h3>

                    <p>{product.brand}</p>

                    <span>
                        ₹{product.price}
                    </span>

                    <button
                        onClick={() =>
                            dispatch(
                                removeWishlist(product._id)
                            )
                        }
                    >
                        Remove
                    </button>

                </div>


            ))}



        </div>

    </>)
}

export default WishlistPage