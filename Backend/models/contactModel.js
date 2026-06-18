


const mogoose = require("mongoose")
const contactSchema = new mogoose.Schema({
    
         
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
phone: {
   type: String,
   required: true,
   trim: true
},
    isRead: {
      type: Boolean,
      default: false,
    },

},{timestamps:true})


module.exports=mogoose.model("Contact",contactSchema)