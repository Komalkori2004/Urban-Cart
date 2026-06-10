

import React, { useEffect, useState } from 'react'
import { getProfile } from '../redux/thunks/authThunks'
import { useDispatch, useSelector } from 'react-redux'
import { getAddresses ,addAddress} from '../redux/thunks/authThunks'

import "../style/userD.css"

const UserProfile = () => {

  const dispatch = useDispatch()

  const { user, loading, error, addresses } = useSelector(state => state.auth)
  const [showAddresses, setShowAddresses] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India"
})

  useEffect(() => {
    dispatch(getProfile())
    dispatch(getAddresses())
  }, [dispatch])

      const handleChange = (e) => {

        setShippingAddress({
            ...shippingAddress, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
  e.preventDefault()

  const resultAction =
  await dispatch(
    addAddress(shippingAddress)
  )

  console.log(shippingAddress)

  if(addAddress.fulfilled.match(resultAction)){
    
    dispatch(getAddresses())

    setShowAddresses(false)

    setShippingAddress({
      fullName:"",
      phone:"",
      addressLine1:"",
      addressLine2:"",
      city:"",
      state:"",
      pincode:"",
      country:"India"
    })
}
}
  console.log("user ", user)
  return (
    <>
      <div className="container">

        <div className="profile-container">

          <div className="profile-card">

            <div className="profile-header">

              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <h2>{user?.name}</h2>

              <p className="profile-tag">
                Premium Member
              </p>

            </div>

            <div className="profile-item">
              <span>Name</span>
              <h3>{user?.name}</h3>
            </div>

            <div className="profile-item">
              <span>Email</span>
              <h3>{user?.email}</h3>
            </div>

            <div className="profile-item">
              <span>Role</span>
              <h3>{user?.role}</h3>
            </div>

            <div className="profile-item">
              <span>Status</span>

              {
                user?.isVerified ? (
                  <div className="verified-badge">
                    Verified
                  </div>
                ) : (
                  <div className="unverified-badge">
                    Not Verified
                  </div>
                )
              }
            </div>

          </div>
          <h2>Saved Addresses</h2>

          {
            addresses?.map((address) => (
              <div key={address._id}>
                <h4>{address.fullName}</h4>

                <p>{address.phone}</p>

                <p>{address.addressLine1}</p>

                <p>{address.city}</p>

                <p>{address.state}</p>
              </div>
            ))
          }
        

        </div>
          <button
            className="add-address-btn"
            onClick={() => setShowAddresses(true)}
          >
            + Add New Address
          </button>


          {
          showAddresses && (
              <div>

                <div className="checkout-container">
<h1 className="checkout-title">
  Add New Address
</h1>

            <form
                className="checkout-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    required
                    placeholder="Full Name"
                    name="fullName"
                    onChange={handleChange}
                    value={shippingAddress.fullName}
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={handleChange}
                    value={shippingAddress.phone}
                    required
                />

                <input
                    type="text"
                    placeholder="Address Line 1"
                    name="addressLine1"
                    className="full-width"
                    onChange={handleChange}
                    value={shippingAddress.addressLine1}
                    required
                />

                <input
                    type="text"
                    placeholder="Address Line 2"
                    className="full-width"
                    name="addressLine2"
                    onChange={handleChange}
                    value={shippingAddress.addressLine2}
                />

                <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={handleChange}
                    value={shippingAddress.city}
                    required
                />

                <input
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={handleChange}
                    value={shippingAddress.state}
                    required
                />

                <input
                    type="text"
                    placeholder="Pincode"
                    name="pincode"
                    onChange={handleChange}
                    value={shippingAddress.pincode}
                    required
                />


                <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleChange}
                    readOnly
                />
                {/* <div className="payment-section">

                    <h3>Payment Method</h3>

                    <label className="payment-option">

                        <input
                            type="radio"
                            value="COD"
                            checked={paymentMethod === "COD"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />

                        <span>Cash On Delivery</span>

                    </label>
                    <label className="payment-option disabled">

                        <input
                            type="radio"
                            value="ONLINE"
                            disabled
                        />

                        <span>Online Payment (Coming Soon)</span>

                    </label>
                </div> */}

            <button type="submit">
  Save Address
</button>

            </form>

        </div >

              </div>
            )
          }
      </div>
    </>
  )
}

export default UserProfile