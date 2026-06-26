
const rozerpay = require("../config/rozerpay")
const crypto = require("crypto");

const slugify = require("slugify")
// const membershipModel = require("../models/membershipPlan.model")

const MemberShip = require("../models/membershipModel")

const asyncHandler = require("../middleware/asyncHandler")
const ErrorHandler = require("../utils/errorHandler")
const User = require("../models/userModel");
const UserMembership = require("../models/userMembership.model");







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





const deleteMembershipPlan = asyncHandler(async (req, res, next) => {

    const membershipPlan = await MemberShip.findById(
        req.params.id
    );

    if (!membershipPlan) {
        return next(
            new ErrorHandler(
                404,
                "Membership plan not found."
            )
        );
    }

    membershipPlan.isActive = false;

    await membershipPlan.save();

    res.status(200).json({
        success: true,
        message: "Membership plan deleted successfully."
    });

});



// /





const purchaseMembership = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        return next(new ErrorHandler(404, "User not found"))
    }


    const membershipPlan = await MemberShip.findOne({
        _id: req.params.planId,
        isActive: true
    })

    if (!membershipPlan) {
        return next(new ErrorHandler(404, "Membership plan not found"))
    }
    const existingMembership = await UserMembership.findOne({
        user: user._id,
        status: "active",
        expiryDate: { $gt: Date.now() }

    })

    if (existingMembership) {
        return next(new ErrorHandler(400, "You already have an active membership plan"))
    }

    // const userMembership = await UserMembership.create({
    //     user: user._id,
    //     membershipPlan: membershipPlan._id,
    //     amountPaid: membershipPlan.price,
    //     paymentMethod: "razorpay",
    //     paymentStatus: "pending",
    //     expiryDate: new Date(Date.now() + membershipPlan.durationInDays * 24 * 60 * 60 * 1000)
    // })

    const options = {
        amount: membershipPlan.price * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1
    }
    const response = await rozerpay.orders.create(options);


    if (!response) {
        return next(
            new ErrorHandler(
                500,
                "Failed to create Razorpay order"
            )
        )
    }

    res.status(200).json({
        success: true,
        message: "Membership order created successfully",
        membershipPlan,
        order: response
    });

})





const verifyMembershipPayment = asyncHandler(async (req, res, next) => {


    const {
        membershipPlanId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body;


    // step 1 
    if (!membershipPlanId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return next(new ErrorHandler(400, "Please provide all required fields"))
    }

    //    step 2

    const generatedSignature =
        crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_order_id +
                "|" +
                razorpay_payment_id
            )
            .digest("hex");


    // if (
    //     generatedSignature !==
    //     razorpay_signature
    // ) {
    //     return next(
    //         new ErrorHandler(
    //             400,
    //             "Invalid payment signature"
    //         )
    //     );
    // }


    const membershipPlan =
        await MemberShip.findOne({
            _id: membershipPlanId,
            isActive: true
        });

    if (!membershipPlan) {
        return next(
            new ErrorHandler(
                404,
                "Membership plan not found"
            )
        );
    }

    const existingMembership =
        await UserMembership.findOne({
            user: req.user.id,
            status: "active",
            expiryDate: {
                $gt: new Date()
            }
        });

    if (existingMembership) {
        return next(
            new ErrorHandler(
                400,
                "User already has an active membership"
            )
        );
    }


    const userMembership =
        await UserMembership.create({

            user: req.user.id,

            membershipPlan:
                membershipPlan._id,

            amountPaid:
                membershipPlan.price,

            paymentMethod:
                "razorpay",

            paymentStatus:
                "paid",

            razorpayOrderId:
                razorpay_order_id,

            razorpayPaymentId:
                razorpay_payment_id,

            razorpaySignature:
                razorpay_signature,

            expiryDate:
                new Date(
                    Date.now() +
                    membershipPlan.durationInDays *
                    24 *
                    60 *
                    60 *
                    1000
                )
        });


    await User.findByIdAndUpdate(
        req.user.id,
        {
            membership:
                userMembership._id
        }
    );

    res.status(200).json({
        success: true,
        message:
            "Membership activated successfully",
        userMembership
    });


})




// 


const getMyMembership = asyncHandler(async (req, res, next) => {

    console.log("REQ USER:", req.user);

    const allMemberships =
        await UserMembership.find();

    console.log(
        "ALL MEMBERSHIPS:",
        allMemberships
    );
    const membership =
        await UserMembership
            .findOne({
                user: req.user.id,
                status: "active",
                expiryDate: {
                    $gt: new Date()
                }
            })
            .populate("membershipPlan");

    if (!membership) {
        return next(
            new ErrorHandler(
                404,
                "Membership not found"
            )
        );
    }

    res.status(200).json({
        success: true,
        membership
    })



})



const getMembershipHistory = asyncHandler(async (req, res, next) => {
    const memberships = await UserMembership.find({
        user: req.user.id
    })
        .populate("membershipPlan")
        .sort({
            createdAt: -1
        });


    if (memberships.length === 0) {
        return next(new ErrorHandler(404, "No membership history found"))
    }

    res.status(200).json({
        success: true,
        memberships
    })
})




// 

const cancelMembership = asyncHandler(async (req, res, next) => {
    const membership =
        await UserMembership.findOne({
            user: req.user.id,
            status: "active",
            expiryDate: {
                $gt: new Date()
            }
        });


    if (!membership) {
        return next(
            new ErrorHandler(
                404,
                "No active membership found"
            )
        );
    }

    membership.status = "cancelled"
    await membership.save()


    await User.findByIdAndUpdate(
        req.user.id,
        {
            membership: null
        }
    );


    res.status(200).json({
        success: true,
        message:
            "Membership cancelled successfully",
        membership
    });



})

module.exports = {
    createMembershipPlan,
    getAllMembershipPlans,
    getSingleMembershipPlan,
    updateMembershipPlan,
    deleteMembershipPlan,
    purchaseMembership,
    verifyMembershipPayment,
    getMyMembership,
    getMembershipHistory,
    cancelMembership

}