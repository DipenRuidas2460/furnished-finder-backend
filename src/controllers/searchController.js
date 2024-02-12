const asyncHandler = require("express-async-handler");
const MySearches = require("../models/mySearches");

const createSavedSearches = asyncHandler(async (req, res) => {
  try {
    const { location, budget, bathroom, bedroom, propertyType, petAllowed } =
      req.body;

    const obj = {
      location: location,
      budget: budget,
      bathroom: bathroom,
      bedroom: bedroom,
      propertyType: propertyType,
      petAllowed: petAllowed,
      loggedInUserId: req.person.id,
    };
    const searchData = await MySearches.create(obj);
    const response = await searchData.save();
    return res.status(201).json({
      status: true,
      response: response,
      message: "Search Data successfully Stored!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

const getAllSearchDetails = asyncHandler(async (req, res) => {
  try {
    const response = await MySearches.findAll({});

    return res.status(200).json({
      status: "success",
      data: response,
      message: response.length ? "Successfully fetch data" : "No data found",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
      messageInfo: error,
    });
  }
});

const getSearchDetailsById = asyncHandler(async (req, res) => {
  try {
    const response = await MySearches.findOne({
      id: req.params.searchId,
    });

    return res.status(200).json({
      status: "success",
      data: response,
      message: response ? "Successfully fetch data" : "No data found",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
      messageInfo: error,
    });
  }
});

const deleteSearchDetails = asyncHandler(async (req, res) => {
  try {
    await MySearches.destroy({
      where: { id: req.params.searchId },
    });

    return res.status(201).json({
      status: "Success!",
      message: "Successfully Deleted!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
});

module.exports = {
  createSavedSearches,
  getAllSearchDetails,
  getSearchDetailsById,
  deleteSearchDetails
};
