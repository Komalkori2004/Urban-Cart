

const asyncHandler = require("../middleware/asyncHandler")
const ErrorHandler = require("../utils/errorHandler")
const rozerpay=require("../config/rozerpay")

const createRozerOrder=asyncHandler(async(req,res,next)=>{

    const {amount}=req.body

  const options = {
    amount: amount * 100, // paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`
  };
const order = await rozerpay.orders.create(options)

res.status(200).json({

    sucess:true,
    order
})

})

module.exports={createRozerOrder}