import React from 'react'

import api from "../services/api"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Signup = () => {

    const navigate = useNavigate()
    const [formData, setForm] = useState({
        name: "",
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
            const { data } = await api.post("/auth/register", formData)

            navigate("/login")
            setmessage(data.message)
        } catch (error) {
            setmessage(error.response.data.message)
        }

    }


    return (
        <>
            <div>

                <h2>Signup</h2>
                <form onSubmit={handleSubmite}>

                    <input type="text" name="name" placeholder="name" onChange={handleChange} value={formData.name} /><br/>
                    <input type="email" name="email" placeholder="email" onChange={handleChange} value={formData.email} /><br/>
                    <input type="password" name="password" placeholder="password" onChange={handleChange} value={formData.password} /><br/>
                    <button type="submit">Signup</button>

                </form>
                <p>{message}</p>


            </div>
        </>
    )
}

export default Signup