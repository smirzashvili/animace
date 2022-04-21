const Author = require("../models/authors")

const getAuthor = async (req,res) => {
    const name = req.params.name
    try {
        const author = await Author.findOne({ fullname: name })
        res.json(author)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = {
    getAuthor
}