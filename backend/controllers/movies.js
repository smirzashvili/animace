const Movie = require("../models/movies")

const getMovies = async (req,res) => {
    try{
        const page = parseInt(req.query.page || "0")
        const PAGE_SIZE = 12
        const movies = await Movie.find().populate('genre').populate("actors")
        .sort({pathname: 1})
        .limit(PAGE_SIZE).skip(PAGE_SIZE * page)
        const totalMovies = await Movie.countDocuments({})
        const totalPages = Math.ceil(totalMovies / PAGE_SIZE)
        res.status(200).json({ totalPages: totalPages, movies })
    }
    catch (err){
        res.status(500).json(err)
    }
}
const getMovie = async (req,res) => {
    try {
        const name = req.params.name
        const movie = await Movie.findOne({pathname: name}).populate("genre")
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

        res.json(movie)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = {
    getMovies,
    getMovie,
}