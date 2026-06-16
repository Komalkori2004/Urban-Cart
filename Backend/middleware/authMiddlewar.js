
const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/errorHandler")


const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;
    next();

  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

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