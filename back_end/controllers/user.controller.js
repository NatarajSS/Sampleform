const UserService = require("../services/user.service");
const sendMail = require("../utils/mail.utils");
const { customAlphabet } = require("nanoid");
const {
  generateOtp,
  forgotHtml,
  addMinutesToDate,
} = require("../utils/function.utils");
const nanoid = customAlphabet("1234567890", 6);
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const userController = {
  // User registration
  register: async (req, res) => {
    try {
      const create = await UserService.create(req.body);
      if (create) {
        return res.status(200).send({
          message: "User created successfully.",
        });
      }
      return res.status(400).send({ message: "Failed to register user." });
    } catch (err) {
      console.log("err", err);
      return res
        .status(400)
        .send({ message: "Failed to register user.", err: err });
    }
  },

  getAllUserList: async (req, res) => {
    try {
      const user = await UserService.getAllUserList1();
      if (user) {
        return res
          .status(200)
          .send({ message: "User list", total_users: user.length, user });
      }
      return res.status(404).send({ message: "User not found." });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Failed to create networksettings" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const update = await UserService.editUser(req.params.id, req.body);
      if (update) {
        return res.status(200).send({ message: "User details updated." });
      }
      return res
        .status(400)
        .send({ message: "Failed to update user details." });
    } catch (err) {
      console.log("err", err);
      return res
        .status(400)
        .send({ message: "Failed to update user details", err: err });
    }
  },

};

module.exports = userController;
