const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
  userWithoutPassword,
  userWithPassword,
} = require("../utils/select.utils");
const jwt = require("jsonwebtoken");

const userService = {
  // Create user
  create: async (data) => {
    try {
      const user = await User.create(data);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },

  // Get user list
  getUserList: async ({ query, limit, skip }) => {
    try {
      const user = await User.find(query, userWithoutPassword)
        .limit(limit)
        .skip(skip)
        .lean();
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },

  // Update user
  editUser: async (id, data) => {
    try {
      const update = await User.updateOne({ _id: id }, data);
      if (update.modifiedCount === 0) {
        return false;
      }
      return true;
    } catch (err) {
      throw new Error(err);
    }
  },

  // Delete User
  deleteUser: async (id) => {
    try {
      const deleteUser = await User.deleteOne({ _id: id });
      return deleteUser;
    } catch (err) {
      throw new Error(err);
    }
  },
  
  getAllUserList1: async () => {
    try {
      const user = await User.find();
      //const userCount = await User.find().countDocuments();
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = userService;
