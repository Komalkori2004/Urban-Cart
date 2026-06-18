

const Contact = require("../models/contactModel")


const ErrorHandler = require("../utils/errorhandler")
const asyncHandler = require("../middleware/asyncHandler")



const createContact = asyncHandler(async (req, res, next) => {


    const { name, email, phone, subject, message } = req.body


    if (!name || !email || !phone || !subject || !message) {
        return next(new ErrorHandler(400, "Please enter all fields"))
    }




    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return next(
            new ErrorHandler(
                400,
                "Please enter a valid email"
            )
        );
    }

    if (phone.length < 10) {
        return next(
            new ErrorHandler(
                400,
                "Please enter a valid phone number"
            )
        );
    }
    await Contact.create({
        name,
        email,
        phone,
        subject,
        message
    })

    res.status(200).json({
        success: true,
        message: "Message sent successfully"
    })

})



const getContact = asyncHandler(async (req, res, next) => {



    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.status(200).json({
        success: true,
        count: contacts.length,
        contacts
    })

})


const markAsRead = asyncHandler(async(req,res,next)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        return next(new ErrorHandler(404," Message not found"))
    }

    contact.isRead = true 
    await contact.save()
    res.status(200).json({
        success:true,
        message:"Message marked as read"
    })

})
module.exports = {
    createContact,
    getContact,
    markAsRead
}