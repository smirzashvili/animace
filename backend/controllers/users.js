const User = require("../models/users")
const accessTokenGenerator = require('../utils/accessTokenGenerator');
const refreshTokenGenerator = require('../utils/refreshTokenGenerator');
const bcrypt = require("bcrypt")
const mailSender = require('../utils/mailSender')
const jwt = require('jsonwebtoken')


const getUsers = async (req,res) => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    }
    catch (err){
        res.status(500).json(err)
    }
}
const createUser = async (req,res) => {
    const { name, surname, username, email, password } = req.body;
    const file = "https://secure.gravatar.com/avatar/98c8f3efd68dde3f83cd37a00a9390b1?s=36&d=mm&r=g"
    if(!name.trim() || !email.trim() || !password.trim() || !surname.trim() || !username.trim())
    return res.status(400).json({msg: "Please fill in all fields!"})
    if(!validateEmail(email))
        return res.status(400).json({msg: "Please enter a valid email!"})
    if(password.length < 8)
        return res.status(400).json({ msg: "Password must be at least 8 characters!"})
    if(validateUsername(username))
        return res.status(400).json({ msg: "Username shouldn't contain special characters!"})
        
    const emailExist = await User.findOne({ email: email });
    const usernameExist = await User.findOne({ username: username });
    
    if (emailExist) {
        return res.status(400).json({msg: "User already exist with this email!"})
    }
    if (usernameExist) {
        return res.status(400).json({msg: "User already exist with this username!"})
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    try {
        const user = await User.create({ name, surname, username, email, password: hashedPassword, file });
        res.status(200)

        const refresh_token = refreshTokenGenerator({id: user._id})

        res.cookie('token', refresh_token, {
            httpOnly: true,
            maxAge: 7*24*60*60*1000
        })

        res.json(user);

    } catch(err) {
        return res.status(400).json({msg: "Something went wrong!"})
    }
}
const logInUser = async (req,res) => {
    const { usernameOrEmail, password } = req.body;

    if(!usernameOrEmail.trim() || !password.trim())
        return res.status(400).json({msg: "Please fill in all fields!"})
    
    let user

    if(usernameOrEmail.includes('@')) {
        user = await User.findOne({ email: usernameOrEmail });
        if(!user) {
            return res.status(400).json({msg: "Email is incorrect"})
        }
    }
    else {
        user = await User.findOne({ username: usernameOrEmail });
        if(!user) {
            return res.status(400).json({msg: "Username is incorrect"})
        }
    }

    if (user && (await user.isPasswordMatch(password))) {

        const refresh_token = refreshTokenGenerator({id: user._id})

        res.status(200).cookie("token", refresh_token, { httpOnly: true, maxAge: 7*24*60*60*1000 }).json(user);

    } else {
      return res.status(401).send({ msg: 'Password is incorrect!'});
    }
}

const logOutUser = async (req,res) => {
    try {
        res.clearCookie('token')
        return res.json({msg: "Logged out."})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
const getToken = async (req,res) => {
    try {
        const rf_token = req.cookies.token

        if(!rf_token) return res.status(400).json({msg: "Please login now!"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "Please login now!"})
            res.json({rf_token})
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


const editUser = async (req,res) => {
    try {
        const {name, surname, username, email, password, token} = req.body;
        const file = req.files?.file.name

        let hashedPassword

        if(!name.trim() || !email.trim() || !surname.trim() || !username.trim())
            return res.status(400).json({msg: "Please fill in the fields!"})

        if(!validateEmail(email))
            return res.status(400).json({msg: "Please enter a valid email!"})

        if(password.length > 0 && password.length < 8) {
            return res.status(400).json({ msg: "Password must be at least 8 characters!"})
        } else if(password.length >= 8) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt)
        }

        if(validateUsername(username))
            return res.status(400).json({ msg: "Username shouldn't contain special characters!"})

        await User.findOne({ _id: req.user.id.id }).then(async doc => {
            doc.name = name
            doc.surname = surname
            doc.username = username
            doc.email = email
            if(hashedPassword) {
                doc.password = hashedPassword
            }
            if(file) {
                doc.file = file
            }

            await doc.save(function(err){
                if(err) {
                    if(err?.code === 11000) {
                        return res.status(500).json({msg: `User exists with this ${Object.keys(err.keyPattern).toString()}`})
                    } 
                    return res.status(500).json({msg: err.message})
                } 
                else {
                    return res.status(200).json(doc)
                }
            })
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const forgetPasswordUser = async (req,res) => {
    try {
        const { usernameOrEmail } = req.body;

        if(!usernameOrEmail.trim())
            return res.status(400).json({msg: "Please fill in a field!"})

        let user

        if(usernameOrEmail.includes('@')) {
            user = await User.findOne({ email: usernameOrEmail });
            if(!user) {
                return res.status(400).json({msg: "Email is incorrect!"})
            }
        }
        else {
            user = await User.findOne({ username: usernameOrEmail });
            if(!user) {
                return res.status(400).json({msg: "Username is incorrect!"})
            }
        }

        const access_token = accessTokenGenerator({id: user._id})
        const url = `https://animace-back.onrender.com/reset-password/${access_token}`  

        mailSender(user.email, user.username, url)

        res.status(200).json({msg: "Check your email for further instructions"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const resetPasswordUser = async (req,res) => {
    try {
        const {password, confirm_password} = req.body.data

        if(!password.trim() || !confirm_password.trim())
            return setError("Please fill in all fields!")
        if(password !== confirm_password)
            return setError("Passwords do not match!")
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        await User.findOneAndUpdate({_id: req.user.id.id}, {
            password: hashedPassword
        })
        
        res.status(200).json({msg: "Password successfully changed!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getUser = async (req,res) => {
    try {
        const token = req.header("Authorization")
        const user = await User.findOne({ _id: req.user.id.id})
        res.status(200).json({user, token})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validateUsername(username) {
    const re = /[!@#$%^&*()+=[\]{};':"\\|,.<>/?]+/;
    return re.test(username);
}


module.exports = {
    createUser,
    getUser,
    getUsers,
    editUser,
    logInUser,
    logOutUser,
    resetPasswordUser,
    forgetPasswordUser,
    getToken
}