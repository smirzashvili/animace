const Article = require("../models/articles")
const Review = require("../models/reviews")
const Movie = require("../models/movies")
const Serie = require("../models/series")
const Manga = require("../models/mangas")

const search = async (req,res) => {
    const keyword = req.query.s
    const type = req.query.type

    try {
        let arr = []
        if(type === "") {
            const articles = await Article.find().populate("category").populate("tag").populate("author").lean()
            const reviews = await Review.find().populate("category").populate("tag").populate("author").lean()
            const movies = await Movie.find().lean()
            const series = await Serie.find().lean()
            const mangas = await Manga.find().lean()
            arr = [...articles, ...reviews, ...movies, ...series, ...mangas]
        } else if(type === "reviews") {
            const reviews = await Review.find().populate("category").populate("tag").populate("author").lean()
            arr = [...reviews]
        } else if(type === "posts") {
            const articles = await Article.find().populate("category").populate("tag").populate("author").lean()
            arr = [...articles]
        } 

        let filtered = arr.filter(item => {
            return item.title.toLowerCase().includes(keyword)
        })
        
        filtered.sort(function(a,b){
            return b.createdAt - a.createdAt;
        })

		res.json(filtered);

	} catch (err) {
		console.log(err);
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
}

const filterPosts = async (req,res) => {
    const articles = await Article.find().populate("author").populate("category").populate({path: "tag"}).lean()
    const reviews = await Review.find().populate("author").populate("category").populate({path: "tag"}).lean()
    
    const {name, type} = req.body
    
    let combinedArray = [...articles, ...reviews]
    combinedArray.sort(function(a,b){
        return b.createdAt - a.createdAt;
    });

    let arr = []
    combinedArray.filter(item=> {
        if(type === "tag") {
            item.tag.filter(tag => {
                if(tag.title.toLowerCase() === name.toLowerCase()) {
                    arr.push(item)
                }
            })
        } 
        else if(type === "category") {
            item.category.filter(cat => {
                if(cat.title === name) {
                    arr.push(item)
                }
            })
        } else if(type === "author") {
            if(item.author.fullname === name) {
                arr.push(item)
            }
        } 
    })
    res.json(arr)
}

const filterMedia = async (req,res) => {
    const {name, type} = req.body
    const movies = await Movie.find().populate("genre").populate({
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
    const series = await Serie.find().populate("genre").populate({
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
    const mangas = await Manga.find().populate("genre")
    
    let combinedArray = [...movies, ...series, ...mangas]

    combinedArray.sort((a,b) => a.title.localeCompare(b.title));
    let arr = []

    if(type === "genre") {
        combinedArray.filter(item=> {
            item.genre.filter(gen => {
                if(gen.title === name) {
                    arr.push(item)
                }
            })
        })
    } else if(type === "actor") {
        combinedArray.map(item=> {
            item.actors?.map(act => {
                if(name === act.actor?.fullName) {
                    arr.push(item)
                }
            })
        })
    } else if(type === "staff") {
        combinedArray.map(item=> {
            item.staff?.map(stf => {
                if(name.toLowerCase() === stf.staff.fullName.toLowerCase()) {
                    arr.push(item)
                }
            })
        })
    }
    
    res.json(arr)
}
const filterRelatedPosts = async (req,res) => {

    const {name} = req.body

    const articles = await Article.find().populate("author").populate({path: "tag", select: "title"}).lean()
    const reviews = await Review.find().populate("author").populate({path: "tag", select: "title"}).lean()

    let combinedArray = [...articles, ...reviews]
    combinedArray.sort(function(a,b){
        return b.createdAt - a.createdAt;
    });
    let arr = []

    combinedArray.filter(item=> {
        item.tag.filter(tag => {
            if(name.includes(tag.title)) {
                arr.push(item)
            }
        })
    })

    
    // arr = arr.slice(0,1)

    res.json(arr)

}
const filterRelatedMedia = async (req,res) => {
    // maybe by studio
    const {name} = req.body

    const movies = await Movie.find().lean()
    const series = await Serie.find().lean()
    const mangas = await Manga.find().lean()

    let combinedArray = [...movies, ...series, ...mangas]

    let filtered = combinedArray.filter(item => {
        if(name.toLowerCase() !== item.title.toLowerCase()) {
            return name.toLowerCase().includes(item.title.toLowerCase())
        }
    })

    res.json(filtered)
}



module.exports = {
    search,
    filterPosts,
    filterMedia,
    filterRelatedPosts,
    filterRelatedMedia
}