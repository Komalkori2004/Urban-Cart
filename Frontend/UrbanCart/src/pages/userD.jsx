

import React, { useEffect, useState } from 'react'
import api from '../services/api'


const UserProfile = () => {

    const [user, setuser] = useState(null)

    useEffect(() => {

        const getuser = async () => {

            try {
                const { data } = await api.get("/auth/profile")
                setuser(data.user)


            } catch (error) {
                console.log(error.response.data.message)
            }

        }
        getuser()


    }, [])



    return (
        <>


            <div>

                <h1>User Profile</h1>

                <h2>{user?.id}</h2>

                <h2>{user?.role}</h2>

            </div>

        </>
    )
}

export default UserProfile