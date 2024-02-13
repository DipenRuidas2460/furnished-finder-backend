const asyncHandler = require("express-async-handler");
const Review = require("../models/review");

const createReviewList = asyncHandler(async (req, res) => {
  try {
    const reviewData = await Review.create(req.body);
    const response = await reviewData.save();
    return res.status(201).json({
      status: true,
      response: response,
      message: "Review Data created successfully!",
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong", error: err });
  }
});

const getAllReviewOfPropertyOwner = asyncHandler(async (req, res) => {
  try {
    const response = await Property.findAll({});
    return res.status(200).json({
      status: "success",
      data: response,
      message: response.length
        ? "Successfully fetch All data"
        : "No data found",
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

module.exports = { createReviewList };
