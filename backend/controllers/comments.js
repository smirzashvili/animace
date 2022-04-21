const Comment = require("../models/comments")
const Article = require("../models/articles")
const User = require("../models/users")

const getComments = async (req,res) => {
    try{
        const comments = await Comment.find()
        res.status(200).json(comments)
    }
    catch (err){
        res.status(500).json(err)
    }
}
const getComment = async (req,res) => {

}
const addComment = async (req,res) => {
    try {

        const {name,email,website,text,photo,id} = req.body.author

        const {index, postId, parentCom} = req.body
        let com
        if(id) {
            const user = await User.findOne({_id: id})
            com =  await Comment.create({author: user._id, text, index, repliedTo: parentCom})
            com.populate("author")
        
        } else {
            com =  await Comment.create({name, email, website, text, index, repliedTo: parentCom, photo})
        }

        const post =  await Article.findOne({_id: postId}).populate("comments")

        if(parentCom) {
           const parCom = post.comments.find(item => item._id == parentCom)
           const index1 = post.comments.indexOf(parCom)
           let len = index1;
           for(let i = index1 + 1; i < post.comments.length; i++) {
               console.log(index-1, post.comments[i].index)
               if(index-1 === post.comments[i].index) break
               len = len + 1
           }
           
           com && post.comments?.splice(len + 1, 0, com)
        } else {
            com && post.comments?.push(com)
        }
        
        console.log(com)
        post.save()
        // await Comment.deleteMany({})
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

module.exports = {
    getComments,
    getComment,
    addComment
}