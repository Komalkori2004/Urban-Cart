

require("dotenv").config()
const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())
const mongoose = require("mongoose")




app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
    .then(() => {

        console.log("mongoDB altls connected successfully")

    })
    .catch((error)=>{
        console.log("server error",error)
    })


    app.get("/",(req,res)=>{
        res.send("server is running")
    })


    const PORT=process.env.PORT || 5000
    app.listen(PORT,()=>{
        console.log(`server is runningon port ${PORT}`)
    })