const asyncHandler = require("express-async-handler");
const Booking = require("../models/booking");

const createBooking = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    reqBody.loggedInUserId = req.person.id;
    const bookingData = await Booking.create(reqBody);
    const response = await bookingData.save();
    return res.status(201).json({
      status: true,
      response: response,
      message: "Booking Data created successfully!",
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong", error: err });
  }
});

const getBooking = asyncHandler(async (req, res) => {
  try {
    const response = await Booking.findOne({
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

const updateBooking = asyncHandler(async (req, res) => {
  try {
    if (req.person.userTypeId === 1) {
      const response = await Booking.update(req.body, {
        where: { loggedInUserId: req.person.id },
      });
      return res.status(200).json({
        status: response[0] === 0 ? 404 : 200,
        data: response,
        message:
          response[0] === 0 ? "Nothing updated" : "Successfully Updated!",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
});

const deleteBooking = asyncHandler(async (req, res) => {
  try {
    if (req.person.userTypeId === 1) {
      await Booking.destroy({
        where: { loggedInUserId: req.person.id },
      });

      return res.status(200).json({
        status: "Success!",
        message: "Successfully Deleted!",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong", error: err });
  }
});

module.exports = {
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking
};
