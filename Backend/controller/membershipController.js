const slugify = require("slugify")
// const membershipModel = require("../models/membershipPlan.model")

const MemberShip = require("../models/membershipModel")

const asyncHandler = require("../middleware/asyncHandler")
const ErrorHandler = require("../utils/errorHandler")






const createMembershipPlan = asyncHandler(async (req, res, next) => {

    const { name,
        description,
        price,
        durationInDays,
        features,
        discountPercentage,
        freeShipping,
        prioritySupport,
        earlyAccess,
        premiumBadge,
        maxDiscountAmount,
        isPopular,
        isRecommended } = req.body


    // required filds 

    if (!name || !description || !price || !durationInDays) {
        return next(new ErrorHandler(400, "Please provide all required fields"))
    }

    // genrete slug

    const slug = slugify(name, {
        lower: true,
        trim: true
    })
    const existingPlan= await MemberShip.findOne({
        $or:[
            {name},
            {slug}
        ]
    })

    if (existingPlan) {
        return next(
            new ErrorHandler(400, "Membership plan already exists.")
        );
    }


       // Create Membership Plan
    const membershipPlan = await MemberShip.create({
        name,
        slug,
        description,
        price,
        durationInDays,
        features,
        discountPercentage,
        freeShipping,
        prioritySupport,
        earlyAccess,
        premiumBadge,
        maxDiscountAmount,
        isPopular,
        isRecommended
    });


    res.status(201).json({
           success: true,
        message: "Membership plan created successfully.",
        membershipPlan
    })


})



module.exports= {
    createMembershipPlan
}