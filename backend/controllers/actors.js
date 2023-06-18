const Actor = require("../models/actors")

const getActors = async (req,res) => {
    try{
        let actors = await Actor.find().sort({fullName: 1})        
        res.status(200).json(actors)
    }
    catch (err){
        res.status(500).json(err)
    }
}
const getActor = async (req,res) => {
    const name = req.params.name
    try {
        const actor = await Actor.findOne({ fullName: name})
        res.json(actor)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const createActor = async (req,res) => {
    const {fullName, photo} = req.body
    try{
        const actor = await Actor.create({ fullName, photo});
        res.status(200).json(actor)
    }
    catch (err){
        res.status(500).json(err.message)
    }
}

module.exports = {
    getActors,
    getActor,
    createActor                 
}