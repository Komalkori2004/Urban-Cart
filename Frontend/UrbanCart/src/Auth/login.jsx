import React from 'react'

import api from "../services/api"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {


    const navigate = useNavigate()
    const [formData, setForm] = useState({

        email: "",
        password: ""
    })

    const [message, setmessage] = useState("")

    const handleChange = (e) => {
        setForm({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmite = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post("/auth/login", formData)

            localStorage.setItem("token", data.token)

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            )

            api.defaults.headers.common["Authorization"] =
                `Bearer ${data.token}`

            if (data.user.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/profile")
            }
            setmessage(data.message)
        } catch (error) {
            setmessage(error.response.data.message)
        }

    }


    return (
        <>
            <div className="auth-container">

                <div className="auth-box">
                    <h2>Login</h2>
                    <form className="auth-form" onSubmit={handleSubmite}>

                        {/* <input type="text" name="name" placeholder="name" onChange={handleChange} value={formData.name} /><br/> */}
                        <input type="email" name="email" placeholder="email" onChange={handleChange} value={formData.email} /><br />
                        <input type="password" name="password" placeholder="password" onChange={handleChange} value={formData.password} /><br />
                        <button type="submit">Login</button>

                    </form>
                    <p>{message}</p>

                </div>


            </div>
        </>
    )
}

export default Login