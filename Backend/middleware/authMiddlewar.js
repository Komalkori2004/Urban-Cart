
const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/errorHandler")


const authMiddleware = (req, res, next) => {

    try {
     

        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "login first"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()

    } catch (error) {
        res.status(401).json({
            message: "login first"
        })
    }

}


const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler("role not alloed")
            )
        }
        next()
    }


}

module.exports = { authMiddleware, authorizeRoles }