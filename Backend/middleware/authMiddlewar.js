
const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/errorHandler")


const authMiddleware = (req, res, next) => {
try {

  const token =
    req.headers.authorization.split(" ")[1];

  console.log("Token:", token);

  const decode =
    jwt.verify(
      token,
      process.env.JWT_SECRET
    );

  console.log("Decoded:", decode);

  req.user = decode;
  next();

} catch (error) {

  console.log("JWT ERROR:", error.message);

  return res.status(401).json({
    success:false,
    message:error.message
  });
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