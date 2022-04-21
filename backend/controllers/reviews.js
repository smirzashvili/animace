const Review = require("../models/reviews")

const getReviews = async (req,res) => {
    try{
        const PAGE_SIZE = 12
        const page = parseInt(req.query.page || "0")
        const reviews = await Review.find().populate('author').populate("category").populate("tag")
        .sort({createdAt: -1})
        .limit(PAGE_SIZE).skip(PAGE_SIZE * page)
        const totalReviews = await Review.countDocuments({})
        const totalPages = Math.ceil(totalReviews / PAGE_SIZE)
        res.status(200).json({ totalPages: totalPages, reviews })
    }
    catch (err){
        res.status(500).json(err)
    }
}
const getReview = async (req,res) => {
    try {
        const name = req.params.name
        const review = await Review.findOne({pathname: name })
        .populate('author').populate("category").populate("tag")
        .populate({
            path : 'comments',
            populate : {
                path : 'author',
                select: ['name', 'surname', 'file'],
            }
        })
        res.json(review)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = {
    getReviews,
    getReview,
}