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
const productRouter = require("./routes/productRouter")
const cartRouter = require("./routes/cartRouter")
const CategoryRouter = require("./routes/categoryRouter")
const OrderRouter = require("./routes/orderRouter")
const wishlistRouter=require("./routes/wishlistRoute")

const paymentRouter=require("./routes/paymentRoutes")

mongoose.connect(process.env.MONGO_URL)
    .then(() => {

        console.log("mongoDB atls connected successfully")

    })
    .catch((error) => {
        console.log("server error", error)
    })


// routers

app.use("/api/auth", userRouter)

app.use("/api/products", require("./routes/productRouter"))

app.use("/api/cart", cartRouter)
app.use("/api/category", CategoryRouter)

app.use("/api/order", OrderRouter)

app.use("/api/wishlist",wishlistRouter)
app.use("/api/payment",paymentRouter)









// server start
app.get("/", (req, res) => {
    res.send("server is running")
})

// global error handler

app.use(errorMiddleware)

// port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is runningon port ${PORT}`)
})