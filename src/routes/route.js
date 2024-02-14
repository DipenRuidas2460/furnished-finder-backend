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
  getUserDetails,
  updateUserDetails,
  createUserDetails,
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
  deleteSearchDetailsById,
  getSearchDetailsById,
} = require("../controllers/searchController");

const {
  createPropertyList,
  getAllPropertyDetails,
  getPropertyDetailsById,
  updatePropertyDetailsById,
  deletePropertyDetailsById,
} = require("../controllers/propertyController");

const { getPetImage, getPropertyImage } = require("../helper/fileHelper");

const {
  createReviewList,
  getAllReviewByPropertyId,
  getAllReviewByPropertyOwnerId,
  deletePropertyReviewByPropertyId,
} = require("../controllers/reviewController");

const {
  createContactList,
  getContactByContactId,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const {
  createTravelerHousingRequest,
  getTravelerHousingRequest,
  updateTravelerHousingRequest,
} = require("../controllers/travelerHousingRequestController");

const {
  createAgencyHousingRequest,
  getAgencyHousingRequest,
  updateAgencyHousingRequest,
} = require("../controllers/agencyHousingRequestController");

const {
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

// ****** get files ************************************************

router.get("/assets/petImage/:fileName", getPetImage);
router.get("/assets/propertyImg/:fileName", getPropertyImage);

// --------------------------------------- User Route ----------------------------------------------------------------------------------

router.post("/user/register", addUser);
router.post(
  "/user/create-userDetails",
  validateTokenMiddleware,
  createUserDetails
);
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
router.put(
  "/user/updateUserDetails",
  validateTokenMiddleware,
  updateUserDetails
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
router.get("/user/getUserDetails", validateTokenMiddleware, getUserDetails);

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
  deleteSearchDetailsById
);

// --------------------------------------- Property Route ----------------------------------------------------------------------------------

router.post(
  "/property/create-property",
  validateTokenMiddleware,
  createPropertyList
);

router.get(
  "/property/fetch-all-property",
  validateTokenMiddleware,
  getAllPropertyDetails
);

router.get(
  "/property/fetch-property/:propertyId",
  validateTokenMiddleware,
  getPropertyDetailsById
);

router.put(
  "/property/update-property/:propertyId",
  validateTokenMiddleware,
  updatePropertyDetailsById
);

router.delete(
  "/property/delete-property/:propertyId",
  validateTokenMiddleware,
  deletePropertyDetailsById
);

// --------------------------------------- Review Route ----------------------------------------------------------------------------------

router.post("/review/create-review", validateTokenMiddleware, createReviewList);

router.get(
  "/review/fetchAll-review/:propertyId",
  validateTokenMiddleware,
  getAllReviewByPropertyId
);

router.get(
  "/review/fetchAll-review/:propertyOwnerId",
  validateTokenMiddleware,
  getAllReviewByPropertyOwnerId
);

router.delete(
  "/review/delete-review/:propertyId",
  validateTokenMiddleware,
  deletePropertyReviewByPropertyId
);

// --------------------------------------- Contact Route ----------------------------------------------------------------------------------

router.post(
  "/contact/create-contact",
  validateTokenMiddleware,
  createContactList
);

router.get(
  "/contact/fetch-contact/:contactId",
  validateTokenMiddleware,
  getContactByContactId
);

router.put("/contact/update-contact", validateTokenMiddleware, updateContact);

router.delete(
  "/contact/delete-contact",
  validateTokenMiddleware,
  deleteContact
);

// --------------------------------------- Traveler Housing Request Route ----------------------------------------------------------------------------------

router.post(
  "/traveler-housing-request/create",
  validateTokenMiddleware,
  createTravelerHousingRequest
);

router.get(
  "/traveler-housing-request/fetch",
  validateTokenMiddleware,
  getTravelerHousingRequest
);

router.put(
  "/traveler-housing-request/update",
  validateTokenMiddleware,
  updateTravelerHousingRequest
);

// --------------------------------------- Agency Housing Request Route ----------------------------------------------------------------------------------

router.post(
  "/agency-housing-request/create",
  validateTokenMiddleware,
  createAgencyHousingRequest
);

router.get(
  "/agency-housing-request/fetch",
  validateTokenMiddleware,
  getAgencyHousingRequest
);

router.put(
  "/agency-housing-request/update",
  validateTokenMiddleware,
  updateAgencyHousingRequest
);

// --------------------------------------- Booking Route ----------------------------------------------------------------------------------

router.post("/booking/create", validateTokenMiddleware, createBooking);

router.get("/booking/fetch", validateTokenMiddleware, getBooking);

router.put("/booking/update", validateTokenMiddleware, updateBooking);

router.delete("/booking/delete", validateTokenMiddleware, deleteBooking);

module.exports = router;
