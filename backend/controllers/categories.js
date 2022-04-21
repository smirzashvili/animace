const Category = require("../models/categories")

const getCategories = async (req,res) => {
    try{
        let categories = await Category.find()
        categories.sort((a, b) => a.title.localeCompare(b.title))
        res.status(200).json(categories)
    }
    catch (err){
        res.status(500).json(err)
    }
}
const getCategory = async (req,res) => {
    const name = req.params.name
    try {
        const category = await Category.findOne({ title: name })
        res.json(category)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = {
    getCategories,
    getCategory
}