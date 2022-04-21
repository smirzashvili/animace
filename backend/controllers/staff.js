const Staff = require("../models/staff")

const getStaff = async (req,res) => {
    const name = req.params.name
    try {
        const staff = await Staff.findOne({ "fullName" : { $regex : new RegExp(name, "i") } })
        console.log(staff)
        res.json(staff)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = {
    getStaff,
}