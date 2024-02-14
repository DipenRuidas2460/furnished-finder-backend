const asyncHandler = require("express-async-handler");
const TravelerHousingRequest = require("../models/travelerHousingRequest");

const createTravelerHousingRequest = asyncHandler(async (req, res) => {
  try {
    const {
      moveInDate,
      moveOutDate,
      reasonForTravel,
      moreDetails,
      connectedMode,
      phone,
      email,
      lastName,
      firstName,
      petAlloweded,
      budget,
      propertyType,
      bedRoomNeeded,
      numberOfOccupants,
      propertyCity,
      propertyState,
      workingSpaceName,
    } = req.body;
    const obj = {
      moveInDate,
      moveOutDate,
      reasonForTravel,
      moreDetails,
      connectedMode,
      phone,
      email,
      lastName,
      firstName,
      petAlloweded,
      budget,
      propertyType,
      bedRoomNeeded,
      numberOfOccupants,
      propertyCity,
      propertyState,
      workingSpaceName,
      loggedInUserId: req.person.id,
    };
    const housingReqData = await TravelerHousingRequest.create(obj);
    const response = await housingReqData.save();
    return res.status(201).json({
      status: true,
      response: response,
      message: "Traveler Housing Request Data created successfully!",
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong", error: err });
  }
});

const getTravelerHousingRequest = asyncHandler(async (req, res) => {
  try {
    const response = await TravelerHousingRequest.findOne({
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

const updateTravelerHousingRequest = asyncHandler(async (req, res) => {
  try {
    const response = await TravelerHousingRequest.update(req.body, {
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
  createTravelerHousingRequest,
  getTravelerHousingRequest,
  updateTravelerHousingRequest,
};
