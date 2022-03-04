const express = require('express');
const { validateUserData, validateUserAvatar } = require('../middlewares/validations');
const {
  getUsers,
  getUserById,
  getUserInformation,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserInformation);
userRoutes.get('/:id', getUserById);
userRoutes.patch('/me', validateUserData, updateUser);
userRoutes.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

exports.userRoutes = userRoutes;
