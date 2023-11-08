const express = require("express");
const userController = require("../../controllers/user.controller");
const { verifySecret } = require("../../middleware/verify");
const {
  registerSchema,
  updateUserSchema,
} = require("../../utils/validator.utils");
const router = express.Router();
const { celebrate, Segments } = require("celebrate");

router.post(
  "/register",
  verifySecret,
  celebrate({ [Segments.BODY]: registerSchema }),  
  userController.register
);

router.put(
  "/update_user/:id",
  verifySecret,
  celebrate({ [Segments.BODY]: updateUserSchema }),  
  userController.updateUser
);

router.get("/getAllUserList", userController.getAllUserList);

module.exports = router;
