const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

const verifySecret = (req, res, next) => {
};

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) return res.status(403).send({ message: "No token provided." });

    if (!token.includes("Bearer "))
      return res.status(403).send({ message: "Invalid token" });

    token = token.replace("Bearer ", "");

    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      const user = await userService.getSingleUser(decoded.id, undefined);
      if (user) {
        req.user = decoded;
        req.user.wallet_address = user.wallet_address;
        return next();
      }
      return res.status(401).send({ message: "Failed to authenticate token." });
    } else {
      res.status(401).send({ message: "Failed to authenticate token." });
    }
  } catch (err) {
    return res.status(400).send({ message: "Failed to verify token" });
  }
};



module.exports = {
  verifySecret,
  verifyToken,
};
