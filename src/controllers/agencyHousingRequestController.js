const asyncHandler = require("express-async-handler");
const AgencyHousingRequest = require("../models/agencyHousingRequest");

const createAgencyHousingRequest = asyncHandler(async (req, res) => {
  try {
    const {
      propertyCity,
      propertyState,
      travelerInfo,
      agencyName,
      contactNo,
      agencyEmail,
    } = req.body;
    const obj = {
      propertyCity,
      propertyState,
      travelerInfo,
      agencyName,
      contactNo,
      agencyEmail,
      loggedInUserId: req.person.id,
    };
    const housingReqData = await AgencyHousingRequest.create(obj);
    const response = await housingReqData.save();
    return res.status(201).json({
      status: true,
      response: response,
      message: "Agency Housing Request Data created successfully!",
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong", error: err });
  }
});

const getAgencyHousingRequest = asyncHandler(async (req, res) => {
  try {
    const response = await AgencyHousingRequest.findOne({
        where: { loggedInUserId: req.person.id },
    });
    return res.status(200).json({
      status: "success",
      data: response,
      message: response ? "Successfully fetch All data" : "No data found",
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

const updateAgencyHousingRequest = asyncHandler(async (req, res) => {
  try {
    const response = await AgencyHousingRequest.update(req.body, {
      where: { loggedInUserId: req.person.id },
    });
    return res.status(200).json({
      status: response[0] === 0 ? 404 : 200,
      data: response,
      message: response[0] === 0 ? "Nothing updated" : "Successfully Updated!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
});

module.exports = {
  createAgencyHousingRequest,
  getAgencyHousingRequest,
  updateAgencyHousingRequest,
};
