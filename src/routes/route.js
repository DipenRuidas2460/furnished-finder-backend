const express = require("express");
const router = express.Router();
const { validateTokenMiddleware } = require("../middleware/auth");
require("dotenv").config();

const {
  login,
  addUser,
  logOut,
  forgetPass,
  updateUser,
  getAllUsers,
  getUserById,
  fpUpdatePass,
  createUserType,
  updatePassword,
  createPropertyRental,
  getPropertyRentalDetails,
  createFavoritedProperties,
  updatePropertyRentalDetails,
  getFavoritedPropertiesDetails,
  updateFavoritedPropertiesDetails,
} = require("../controllers/userController");

const {
  createSavedSearches,
  getAllSearchDetails,
  deleteSearchDetails,
  getSearchDetailsById,
} = require("../controllers/searchController");

// --------------------------------------- User Route ----------------------------------------------------------------------------------

router.post("/user/register", addUser);
router.post("/user/userType", createUserType);
router.post("/user/login", login);
router.get("/user/logout", logOut);
router.post("/user/forgotpass", forgetPass);
router.post("/user/resetpass", fpUpdatePass);
router.post(
  "/user/propertyRental",
  validateTokenMiddleware,
  createPropertyRental
);
router.post(
  "/user/favoritiesProperties",
  validateTokenMiddleware,
  createFavoritedProperties
);
router.put("/user/update", validateTokenMiddleware, updateUser);
router.put(
  "/user/updatePropertyRentalDetails",
  validateTokenMiddleware,
  updatePropertyRentalDetails
);
router.put(
  "/user/updateFavoritedPropertiesDetails",
  validateTokenMiddleware,
  updateFavoritedPropertiesDetails
);
router.patch("/user/updatePassword", validateTokenMiddleware, updatePassword);
router.get("/user/getUserById", validateTokenMiddleware, getUserById);
router.get("/user/getAllUsers", validateTokenMiddleware, getAllUsers);
router.get(
  "/user/getPropertyRentalDetails",
  validateTokenMiddleware,
  getPropertyRentalDetails
);
router.get(
  "/user/getFavoritedPropertiesDetails",
  validateTokenMiddleware,
  getFavoritedPropertiesDetails
);

// --------------------------------------- Saved Searches Route ----------------------------------------------------------------------------------

router.post(
  "/saved-search/create-saved-searches",
  validateTokenMiddleware,
  createSavedSearches
);
router.get(
  "/saved-search/fetchAll-saved-searches",
  validateTokenMiddleware,
  getAllSearchDetails
);
router.get(
  "/saved-search/fetch-saved-searches/:searchId",
  validateTokenMiddleware,
  getSearchDetailsById
);
router.delete(
  "/saved-search/delete-saved-searches/:searchId",
  validateTokenMiddleware,
  deleteSearchDetails
);

module.exports = router;