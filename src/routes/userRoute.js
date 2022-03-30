const userRouter = require('express').Router();

const { UsersController } = require('../controllers/users');

userRouter.route('/').post(UsersController.createUser);
userRouter.route('/:id').put(UsersController.updateUser);
userRouter.route('/:id').delete(UsersController.deleteUser);
userRouter.route('/get-by-id').post(UsersController.getUserById);
userRouter.route('/').get(UsersController.getUsers);

module.exports = userRouter;
