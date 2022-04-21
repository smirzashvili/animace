const Serie = require("../models/series")

const getSeries = async (req,res) => {
    try{
        const PAGE_SIZE = 12
        const page = parseInt(req.query.page || "0")
        console.log(page)
        const series = await Serie.find().populate('genre').populate("actors")
        .sort({pathname: 1})
        .limit(PAGE_SIZE).skip(PAGE_SIZE * page)
        const totalSeries = await Serie.countDocuments({})
        const totalPages = Math.ceil(totalSeries / PAGE_SIZE)
        res.status(200).json({ totalPages: totalPages, series })
    }
    catch (err){
        res.status(500).json(err)
    }
}
const getSerie = async (req,res) => {
    try {
        const name = req.params.name
        const series = await Serie.findOne({pathname: name }).populate("genre")
        .populate({
            path: "staff",
            populate: {
                path: "staff"
            }
        }).populate({
            path: "actors",
            populate: {
                path: "actor"
            }
        })
        res.json(series)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = {
    getSeries,
    getSerie,
}