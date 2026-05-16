

    require("dotenv").config()
    const express = require("express")
    const app = express()

    const cors = require("cors")
    app.use(cors())
    const mongoose = require("mongoose")
    app.use(express.json())

    const errorMiddleware = require("./middleware/errorMiddleware")

    // routers import
    const userRouter = require("./routes/authRouter")

    // mongoDB connection
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {

            console.log("mongoDB atls connected successfully")

        })
        .catch((error) => {
            console.log("server error", error)
        })


    app.use("/api/auth", userRouter)










    app.get("/", (req, res) => {
        res.send("server is running")
    })

    app.use(errorMiddleware)


    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log(`server is runningon port ${PORT}`)
    })