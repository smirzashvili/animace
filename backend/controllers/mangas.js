const Manga = require("../models/mangas")

const getMangas = async (req,res) => {
    try{
        const PAGE_SIZE = 12
        const page = parseInt(req.query.page || "0")
        if(isNaN(page)) {
            const mangas = await Manga.find().populate("genre")
            res.status(200).json({ mangas })
        } else {
            const mangas = await Manga.find().populate("genre")
            .sort({pathname: 1})
            .limit(PAGE_SIZE).skip(PAGE_SIZE * page)
            const totalMangas = await Manga.countDocuments({})
            const totalPages = Math.ceil(totalMangas / PAGE_SIZE)
            res.status(200).json({ totalPages: totalPages, mangas })
        }
    }
    catch (err){
        res.status(500).json(err)
    }
}
const getManga = async (req,res) => {
    try {
        const name = req.params.name
        const mangas = await Manga.findOne({pathname: name }).populate("genre")
        res.json(mangas)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = {
    getMangas,
    getManga,
}