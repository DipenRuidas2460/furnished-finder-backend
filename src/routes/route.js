const express = require("express");
const router = express.Router();
const { validateTokenMiddleware } = require("../middleware/auth");
require("dotenv").config();

const {
  login,
  addUser,
  forgetPass,
  fpUpdatePass,
  logOut,
  updateUser,
  getUserById,
  updatePassword,
  getAllUsers,
  createUserDetails,
  createUserType,
  updateUserDetails,
  getUserDetails,
} = require("../controllers/userController");

// --------------------------------------- User Route ----------------------------------------------------------------------------------

router.post("/user/register", addUser);
router.post("/user/userType", createUserType);
router.post("/user/login", login);
router.get("/user/logout", logOut);
router.post("/user/forgotpass", forgetPass);
router.post("/user/resetpass", fpUpdatePass);
router.post("/user/userDetails", validateTokenMiddleware, createUserDetails);
router.put("/user/update", validateTokenMiddleware, updateUser);
router.put(
  "/user/updateUserDetails",
  validateTokenMiddleware,
  updateUserDetails
);
router.patch("/user/updatePassword", validateTokenMiddleware, updatePassword);
router.get("/user/getUserById", validateTokenMiddleware, getUserById);
router.get("/user/getAllUsers", validateTokenMiddleware, getAllUsers);
router.get("/user/getUserDetails", validateTokenMiddleware, getUserDetails);

module.exports = router;