


import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectRoute from './protectRoute'

// auth
const Signup = lazy(() => import("../Auth/signup"));

const Login = lazy(() => import("../Auth/login"));

const ForgotPassword = lazy(() =>
    import("../pages/ForgotPassword")
);

const ResetPassword = lazy(() =>
    import("../pages/ResetPassword")
);

import VerifyAccount from '../pages/VerifyAccount'

const AdminProfile = lazy(() =>
    import("../admin/admin")
);

const AdminProducts = lazy(() =>
    import("../admin/AdminProducts")
);

const AdminOrder = lazy(() =>
    import("../admin/AdminOrder")
);

const AdminUsers = lazy(() =>
    import("../admin/AdminUsers")
);

const Subscribers = lazy(() =>
    import("../admin/Subscribers")
);

const CreateCategory = lazy(() =>
    import("../admin/CreateCategory")
);

const UpdateProduct = lazy(() =>
    import("../admin/UpdateProduct")
);




import Product from '../pages/product'
import SingleProduct from '../pages/singleProduct'
import NavBar from '../components/navbar'


import AdminLayout from '../layout/AdminLayout'


// 

const UserProfile = lazy(() =>
    import("../pages/userD")
);

const CartPage = lazy(() =>
    import("../pages/cart")
);

const MyOrders = lazy(() =>
    import("../pages/MyOrders")
);

const CheckoutPage = lazy(() =>
    import("../pages/CheckoutPage")
);

const WishlistPage = lazy(() =>
    import("../pages/WishlistPage")
);

const AddAddressPage = lazy(() =>
    import("../components/AddAddressPage")
);
const CreateProduct = lazy(() =>
    import("../admin/CreateProduct")
);


// 

import HomePage from '../pages/home'





import Footer from '../components/Footer'


import Loader from '../components/Loader'


import ContactMessages from "../admin/ContactMessages";

import MembershipPlans from "../pages/membership/MembershipPlans";

import MyMembership from "../pages/membership/MyMembership";

import MembershipHistory from "../pages/membership/MembershipHistory";

import CreateMembership from "../admin/CreateMembership"

import EditMembership from "../admin/EditMembership"


import MembershipStats from "../admin/MembershipStats";
import SingleMembership from "../pages/membership/SingleMembership";

import MembershipManagement from "../admin/MembershipManagement";


// 
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getWishlist } from '../redux/thunks/wishlistThunks'
import { getCart } from '../redux/thunks/cartThunks'


import UserLayout from "../layout/userLayout";
import ProfileSettings from "../pages/ProfileSettings";
import NotFound from "../components/NotFound";






const AppRouter = () => {
    const dispatch = useDispatch()
    useEffect(() => {

        const token = localStorage.getItem("token")

        if (token) {
            dispatch(getCart())
            dispatch(getWishlist())
        }

    }, [dispatch])
    return (
        <>

            <BrowserRouter>

                <NavBar />
                <Suspense fallback={<Loader />}>

                    <Routes>



                        {/* PUBLIC ROUTES */}
                        <Route path="/" element={<HomePage />} />

                        <Route path="/products" element={<Product />} />
                        <Route path="/product/:slug" element={<SingleProduct />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/verify/:token"
                            element={<VerifyAccount />}
                        />

                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="/plan" element={<MembershipPlans />} />



                        {/* USER ROUTES */}



                        <Route
                            path="/dashboard"
                            element={
                                <ProtectRoute>
                                    <UserLayout />
                                </ProtectRoute>
                            }
                        >

                            {/* Dashboard */}
                            <Route
                                index
                                element={<UserProfile />}
                            />

                            {/* Orders */}
                            <Route
                                path="orders"
                                element={<MyOrders />}
                            />

                            {/* Wishlist */}
                            <Route
                                path="wishlist"
                                element={<WishlistPage />}
                            />

                            {/* Cart */}
                            <Route
                                path="cart"
                                element={<CartPage />}
                            />

                            {/* Address */}
                            <Route
                                path="address"
                                element={<AddAddressPage />}
                            />

                            {/* Membership */}
                            <Route
                                path="c"
                                element={<MyMembership />}
                            />

                            {/* Membership History */}
                            <Route
                                path="membership-history"
                                element={<MembershipHistory />}
                            />

                               <Route
                                path="profile-settings"
                                element={<ProfileSettings />}
                            />
                            


                        </Route>



                        {/*  */}




                        <Route
                            path="/my-membershipHistory"
                            element={
                                <ProtectRoute>
                                    <MembershipHistory />
                                </ProtectRoute>
                            }
                        />


                        <Route
                            path="/wishlist"
                            element={
                                <ProtectRoute>
                                    <WishlistPage />
                                </ProtectRoute>
                            }
                        />

                        <Route
                            path="/cart"
                            element={
                                <ProtectRoute>
                                    <CartPage />
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/checkout"
                            element={
                                <ProtectRoute>
                                    <CheckoutPage />
                                </ProtectRoute>
                            }
                        />



                        <Route
                            path="/membership/:slug"
                            element={
                                <ProtectRoute>
                                    <SingleMembership />
                                </ProtectRoute>
                            }
                        />
                        <Route
                            path="/profile-settings"
                            element={
                                <ProtectRoute>
                                    <ProfileSettings />
                                </ProtectRoute>
                            }
                        />
                        <Route

                            path="*"
                            element={<NotFound />}
                        />

                        





                        {/* ADMIN ROUTES */}

                        <Route
                            path="/admin"
                            element={
                                <ProtectRoute role="admin">
                                    <AdminLayout />
                                </ProtectRoute>
                            }  >

                            <Route index element={<AdminProfile />} />

                            <Route
                                path="add-product"
                                element={<CreateProduct />}
                            />

                            <Route
                                path="all-product"
                                element={<AdminProducts />}
                            />

                            <Route
                                path="update-product/:id"
                                element={<UpdateProduct />}
                            />
                            <Route
                                path="orders"
                                element={<AdminOrder />}
                            />
                            <Route
                                path='add-Category'
                                element={<CreateCategory />}
                            />
                            <Route
                                path='all-users'
                                element={<AdminUsers />}
                            />
                            <Route
                                path='all-Subscribers'
                                element={<Subscribers />}
                            />
                            <Route
                                path='contact-messages'
                                element={<ContactMessages />}
                            />

                            <Route
                                path='create-membership'
                                element={<CreateMembership />}
                            />

                            <Route
                                path='edit-membership/:id'
                                element={<EditMembership />}
                            />

                            <Route
                                path='membership-stats'
                                element={<MembershipStats />}
                            />

                            <Route
                                path='membership-management'
                                element={<MembershipManagement />}
                            />

                        </Route>

                    </Routes>
                </Suspense>

                <Footer />
            </BrowserRouter>
        </>
    )
}

export default AppRouter