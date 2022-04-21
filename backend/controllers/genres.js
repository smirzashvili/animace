const Genre = require("../models/genres")

const getGenres = async (req,res) => {
    try{
        const genres = await Genre.find()
        genres.sort((a, b) => a.title.localeCompare(b.title))
        res.status(200).json(genres)
    }
    catch (err){
        res.status(500).json(err)
    }
}
const getGenre = async (req,res) => {
//     try {
//         const name = req.params.name
//         // const review = await Genre.findOne({pathname: name }).populate('author').populate("category").populate("tag").populate("comments")
//         const review = await Genre.findOne({pathname: name })
//         console.log(review)
//         res.json(review)
//     } catch (err) {
//         return res.status(500).json({msg: err.message})
//     }
}

module.exports = {
    getGenres,
    getGenre,
}