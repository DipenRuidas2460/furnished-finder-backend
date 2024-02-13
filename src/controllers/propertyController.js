const asyncHandler = require("express-async-handler");
const Property = require("../models/property");

const createPropertyList = asyncHandler(async (req, res) => {
  try {
    const {
      location,
      propertyType,
      propertyDescription,
      features,
      availablity,
      contactId,
      reviewId,
    } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const propertyImage = req.files.propertyImage;
    const arr = [];

    propertyImage.forEach(async (file) => {
      const filTypeArr = file.name.split(".");
      const randomInRange = Math.floor(Math.random() * 10) + 1;
      const imagePath = path.join(
        __dirname,
        "../uploads/propertyImg/",
        `${randomInRange}_propertyImage.${filTypeArr[1]}`
      );
      await file.mv(imagePath);
      arr.push(`${randomInRange}_propertyImage.${filTypeArr[1]}`);
    });

    const obj = {
      location: location,
      propertyType: propertyType,
      propertyImage: arr,
      propertyDescription: propertyDescription,
      features: features,
      availablity: availablity,
      contactId: contactId,
      reviewId: reviewId,
      loggedInUserId: req.person.id,
    };
    const propertyData = await Property.create(obj);
    const response = await propertyData.save();
    return res.status(201).json({
      status: true,
      response: response,
      message: "Property Data created successfully!",
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong", error: err });
  }
});

const getAllPropertyDetails = asyncHandler(async (req, res) => {
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

const getPropertyDetailsById = asyncHandler(async (req, res) => {
  try {
    const response = await Property.findOne({
      id: req.params.propertyId,
    });

    const propertyImgArr = [];

    response.propertyImage.forEach((imgName) => {
      propertyImgArr.push(
        `${process.env.BCK_URL}/assets/propertyImg/${imgName}`
      );
    });

    return res.status(200).json({
      message: response ? "Successfully fetch data" : "No data found",
      status: "success",
      data: response,
      propertyImages: propertyImgArr,
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

const updatePropertyDetailsById = asyncHandler(async (req, res) => {
  try {
    let reqBody = req.body;
    const response = await Property.update(reqBody, {
      where: { id: req.params.propertyId },
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

const deletePropertyDetailsById = asyncHandler(async (req, res) => {
  try {
    await Property.destroy({
      where: { id: req.params.propertyId },
    });

    return res.status(200).json({
      status: "Success!",
      message: "Successfully Deleted!",
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong", error: err });
  }
});

module.exports = {
  createPropertyList,
  getAllPropertyDetails,
  getPropertyDetailsById,
  updatePropertyDetailsById,
  deletePropertyDetailsById,
};
