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
    const existingPlan = await MemberShip.findOne({
        $or: [
            { name },
            { slug }
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


const getAllMembershipPlans = asyncHandler(async (req, res, next) => {
    const membershipPlans = await MemberShip.find({
        isActive: true
    }).sort({ price: 1 });

    res.status(200).json({
        success: true,
        membershipPlans
    });
})




const getSingleMembershipPlan = asyncHandler(async (req, res, next) => {
    const membershipPlan = await MemberShip.findOne({
        slug: req.params.slug,
        isActive: true
    });

    if (!membershipPlan) {

        return next(new ErrorHandler(404, "Membership plan not found"))
    }

    res.status(200).json({
        success: true,
        membershipPlan
    })

})




const updateMembershipPlan = asyncHandler(async (req, res, next) => {

    const membershipPlan = await MemberShip.findById(req.params.id);

    if (!membershipPlan) {
        return next(
            new ErrorHandler(404, "Membership plan not found.")
        );
    }

    const {
        name,
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
        isRecommended,
        isActive
    } = req.body;

    membershipPlan.name = name || membershipPlan.name;
    membershipPlan.description = description || membershipPlan.description;
    membershipPlan.price = price || membershipPlan.price;
    membershipPlan.durationInDays = durationInDays || membershipPlan.durationInDays;
    membershipPlan.features = features || membershipPlan.features;
    membershipPlan.discountPercentage = discountPercentage ?? membershipPlan.discountPercentage;
    membershipPlan.freeShipping = freeShipping ?? membershipPlan.freeShipping;
    membershipPlan.prioritySupport = prioritySupport ?? membershipPlan.prioritySupport;
    membershipPlan.earlyAccess = earlyAccess ?? membershipPlan.earlyAccess;
    membershipPlan.premiumBadge = premiumBadge || membershipPlan.premiumBadge;
    membershipPlan.maxDiscountAmount = maxDiscountAmount ?? membershipPlan.maxDiscountAmount;
    membershipPlan.isPopular = isPopular ?? membershipPlan.isPopular;
    membershipPlan.isRecommended = isRecommended ?? membershipPlan.isRecommended;
    membershipPlan.isActive = isActive ?? membershipPlan.isActive;

    // Update Slug if Name Changes
    if (name) {

        const newSlug = slugify(name, {
            lower: true,
            trim: true
        });

        const existingPlan = await MemberShip.findOne({
            slug: newSlug,
            _id: { $ne: membershipPlan._id }
        });

        if (existingPlan) {
            return next(
                new ErrorHandler(400, "Membership plan with this name already exists.")
            );
        }

        membershipPlan.slug = newSlug;
    }

    const updatedMembershipPlan = await membershipPlan.save();

    res.status(200).json({
        success: true,
        message: "Membership plan updated successfully.",
        membershipPlan: updatedMembershipPlan
    });

});


module.exports = {
    createMembershipPlan,
    getAllMembershipPlans,
    getSingleMembershipPlan,
    updateMembershipPlan
}