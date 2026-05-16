import React from 'react'

import api from "../services/api"
import { useState } from 'react'


const Login = () => {

    const [formData, setForm] = useState({
      
        email: "",
        password: ""
    })  

    const [ message, setmessage ] = useState("")

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
            setmessage(data.message)
        } catch (error) {
            setmessage(error.response.data.message)
        }

    }


    return (
        <>
            <div>

                <h2>Login</h2>
                <form onSubmit={handleSubmite}>

                    {/* <input type="text" name="name" placeholder="name" onChange={handleChange} value={formData.name} /><br/> */}
                    <input type="email" name="email" placeholder="email" onChange={handleChange} value={formData.email} /><br/>
                    <input type="password" name="password" placeholder="password" onChange={handleChange} value={formData.password} /><br/>
                    <button type="submit">Signup</button>

                </form>
                <p>{message}</p>


            </div>
        </>
    )
}

export default Login