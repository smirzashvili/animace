const Tag = require("../models/tags")

const getTags = async (req,res) => {
    try{
        const tags = await Tag.find()
        mangas.sort((a,b) => a.title.localeCompare(b.title));
        res.status(200).json(tags)
    }
    catch (err){
        res.status(500).json(err)
    }
}
const getTag = async (req,res) => {
    // const name = req.params.name
    // // console.log(Number(name.slice(9)))
    // const number = Number(name.slice(9))
    // try {
    //     const category = await Tag.findOne({ index: number })
    //     res.json(category)
    // } catch (err) {
    //     return res.status(500).json({msg: err.message})
    // }
}

module.exports = {
    getTags,
    getTag
}