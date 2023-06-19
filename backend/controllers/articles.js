const Article = require("../models/articles")

const getArticles = async (req,res) => {
    try{
        const PAGE_SIZE = 12
        const page = parseInt(req.query.page || "0")
        const articles = await Article.find().populate('author').populate("category").populate("tag")
        .sort({createdAt: -1})
        .limit(PAGE_SIZE).skip(PAGE_SIZE * page)
        const totalArticles = await Article.countDocuments({})
        const totalPages = Math.ceil(totalArticles / PAGE_SIZE)
        res.status(200).json({ totalPages: totalPages, articles })
    }
    catch (err){
        res.status(500).json(err)
    }
}
const getArticle = async (req,res) => {
    console.log('aric')
    try {
        const name = req.params.name
        const article = await Article.findOne({pathname: name })
        .populate('author').populate("category").populate("tag")
        .populate({
            path : 'comments',
            populate : {
                path : 'author',
                select: ['name', 'surname', 'file'],
            }
        })
        // .populate({
        //     path : 'comments',
        //     populate : {
        //         path : 'repliedTo'
        //     }
        // })
        // console.log(article.comments)
        res.json(article)

        // console.log(article.comments)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const getArticlesByAuthor = async (req,res) => {
    try {
        const author = req.headers.author;
        await Article.find().populate('author').exec(function (err, data) {
            if (err) return handleError(err);
            const filtered = data.filter(item=> item.author.fullname === author)
            res.json(filtered)
          });
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const createArticle = async (req,res) => {
    const {title, date, photo, subtitle, text, video, comments} = req.body
    try{
        const article = await Article.create({ title, date, photo, subtitle, text, video, comments});
        res.status(200).json(article)
    }
    catch (err){
        res.status(500).json(err.message)
    }
}

module.exports = {
    getArticles,
    getArticle,
    createArticle,
    getArticlesByAuthor
}