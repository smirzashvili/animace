const express = require('express');
const {authRefresh, authAccess} = require('../middlewares/authMiddleware');
const usersRouter = express.Router();
const uploadImage = require('../middlewares/uploadImageMiddleware');


const {
    // createTask, 
    editUser,
    getUsers,
    getUser, 
    logInUser,
    logOutUser,
    createUser,
    resetPasswordUser,
    forgetPasswordUser,
    getToken
} = require('../controllers/users');


usersRouter.get('/', getUsers);
usersRouter.get('/get-info', authRefresh, getUser);
usersRouter.post('/', createUser)
usersRouter.post('/login', logInUser)
usersRouter.get('/logout', logOutUser)
usersRouter.put('/edit', authRefresh, uploadImage, editUser)
usersRouter.put('/reset-password', forgetPasswordUser)
usersRouter.put('/reset-password/:token', authAccess, resetPasswordUser)
usersRouter.post('/get-token', getToken)



//UPDATE PROFILE

// userRouter.put(
//   '/profile/update',
//   authMiddlware,
//   asynchHandler(async (req, res) => {
//     const user = await User.findById(req.user.id);
//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       //This will encrypt automatically in our model
//       if (req.body.password) {
//         user.password = req.body.password || user.password;
//       }
//       const updateUser = await user.save();
//       res.json({
//         _id: updateUser._id,
//         name: updateUser.name,
//         password: updateUser.password,
//         email: updateUser.email,
//         token: authTokenGenerator(updateUser._id),
//       });
//     } else {
//       res.status(401);
//       throw new Error('User Not found');
//     }
//   })
// );

//Fetch all Users

// userRouter.get(
//   '/',
//   asynchHandler(async (req, res) => {
//     try {
//       const users = await User.find().populate('books');
//       res.status(200);
//       res.json(users);
//     } catch (error) {}
//   })
// );

module.exports = usersRouter;