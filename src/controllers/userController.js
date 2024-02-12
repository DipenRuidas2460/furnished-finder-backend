const User = require("../models/user");
const PropertyRental = require("../models/propertyRental");
const UserType = require("../models/userType");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  checkPassword,
  encryptPassword,
  generateString,
} = require("../helper/side");
const moment = require("moment");
const { sendMail } = require("../helper/sendMail");
const FavoritedProperties = require("../models/favoritedProperties");

const secretKey = process.env.TOKEN_secret_key;
const expiresIn = "24h";

const addUser = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;

    const currentDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD, HH:mm");

    const findEmail = await User.findOne({
      where: { email: reqBody.email },
    });

    const findPhoneNumber = await User.findOne({
      where: { phoneNumber: reqBody.phoneNumber },
    });

    if (findEmail) {
      return res
        .status(409)
        .json({ status: "email conflict", msg: "Email is already present!" });
    }

    if (findPhoneNumber) {
      return res.status(409).json({
        status: "phone conflict",
        msg: "Phone Number is already present!",
      });
    }

    reqBody.password = await encryptPassword(reqBody.password);
    reqBody.displayName =
      reqBody.firstName.toLowerCase() + "." + reqBody.lastName.toLowerCase();

    const userInfo = await User.create({
      ...reqBody,
      createdTime: currentDate,
    });
    const resp = await userInfo.save();

    const token = jwt.sign(
      { id: userInfo.id, userTypeId: userInfo.userTypeId },
      secretKey,
      { expiresIn }
    );

    const mailData = {
      respMail: reqBody.email,
      subject: "Welcome",
      text: `Hi, ${
        reqBody.firstName + " " + reqBody.lastName
      }.Welcome for Furnished Finder!`,
    };
    await sendMail(mailData);

    if (resp) {
      const { id, firstName, lastName, email, phoneNumber, userTypeId } = resp;

      res.header("Authorization", `Bearer ${token}`);

      return res.status(201).json({
        status: true,
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        userTypeId,
        token,
        message: "User successfully created!",
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "User is not created!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      err: error.message,
    });
  }
});

const createPropertyRental = asyncHandler(async (req, res) => {
  try {
    const { workExperience, travelingPreferences, reviewsAndReferences } =
      req.body;

    const obj = {
      workExperience: workExperience,
      travelingPreferences: travelingPreferences,
      reviewsAndReferences: reviewsAndReferences,
      loggedInUserId: req.person.id,
    };
    const propertyRental = await PropertyRental.create(obj);
    const response = await propertyRental.save();
    return res.status(201).json({
      status: true,
      response: response,
      message: "Property Rental Details successfully created!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

const createFavoritedProperties = asyncHandler(async (req, res) => {
  try {
    const { myCities, hobbies, myLandlords, myAssignments } = req.body;

    const obj = {
      myCities: myCities,
      hobbies: hobbies,
      myLandlords: myLandlords,
      myAssignments: myAssignments,
      loggedInUserId: req.person.id,
    };
    const favoritedProterties = await FavoritedProperties.create(obj);
    const response = await favoritedProterties.save();
    return res.status(201).json({
      status: true,
      response: response,
      message: "Favorited proterties Details successfully created!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

const createUserType = asyncHandler(async (req, res) => {
  try {
    const reqBody = req.body;
    const userType = await UserType.create(reqBody);
    const response = await userType.save();
    return res.status(201).json({
      status: true,
      response: response,
      message: "User type successfully created!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "error",
        message: "Send valid email and Password",
      });
    }

    const userInfo = await User.findOne({ where: { email: email } });

    if (!userInfo) {
      return res
        .status(401)
        .json({ status: "error", message: "email incorrect" });
    }

    const isPassMatch = await checkPassword(password, userInfo.password);

    if (!isPassMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Incorrect password, try again" });
    }

    const token = jwt.sign(
      { id: userInfo.id, userTypeId: userInfo.userTypeId },
      secretKey,
      { expiresIn }
    );
    const data = {
      userId: userInfo.id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      userTypeId: userInfo.userTypeId,
      token: token,
    };

    res.header("Authorization", `Bearer ${token}`);

    return res.status(200).json({
      status: "success",
      token,
      userdata: data,
      message: "Login successfull",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, data: error.message, message: "Login fail" });
  }
});

const logOut = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json({
      status: true,
      msg: "Successfully Logged Out!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, data: error.message, message: "LogOut Failed!" });
  }
});

const forgetPass = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const userDetail = await User.findOne({
      where: { email: email },
    });
    if (!userDetail) {
      return res.status(404).json({ status: false, message: "No user found" });
    }

    const token = generateString(20);
    await User.update({ fpToken: token }, { where: { email: email } });

    const mailData = {
      respMail: email,
      subject: "Forget Password",
      text: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="styles.css" />
    <title>Static Template</title>
  </head>
  <body>
    <h3>Click this link for changing Password</h3>
    <p>http://localhost:3000/resetpass/${token}</p>
  </body>
</html>
`,
    };
    await sendMail(mailData);

    return res.status(200).json({
      status: "success",
      token: token,
      message: "Check your email for reset link",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

const fpUpdatePass = asyncHandler(async (req, res) => {
  try {
    let reqBody = req.body;

    const { token } = req.body;

    const userInfo = await User.findOne({ where: { fpToken: token } });
    if (!userInfo)
      return res
        .status(400)
        .json({ status: 400, message: "Wrong link or link expired!" });

    if (reqBody.password) {
      reqBody.password = await encryptPassword(reqBody.password);
    }

    const response = await User.update(
      { password: reqBody.password },
      {
        where: { fpToken: token },
      }
    );

    return res.status(201).json({
      status: response[0] === 0 ? 404 : 200,
      data: response,
      message:
        response[0] === 0
          ? "Nothing updated"
          : "User Password changed successfully!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    let reqBody = req.body;

    if (reqBody.password) {
      reqBody.password = await encryptPassword(reqBody.password);
    }

    const response = await User.update(reqBody, {
      where: { id: req.person.id },
    });

    return res.status(201).json({
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

const updatePropertyRentalDetails = asyncHandler(async (req, res) => {
  try {
    let reqBody = req.body;

    const response = await PropertyRental.update(reqBody, {
      where: { loggedInUserId: req.person.id },
    });

    return res.status(201).json({
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

const updateFavoritedPropertiesDetails = asyncHandler(async (req, res) => {
  try {
    let reqBody = req.body;

    const response = await FavoritedProperties.update(reqBody, {
      where: { loggedInUserId: req.person.id },
    });

    return res.status(201).json({
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

const getUserById = asyncHandler(async (req, res) => {
  try {
    const response = await User.findOne({
      where: { id: req.person.id },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "userTypeId",
      ],
    });

    return res.status(200).json({
      status: "success",
      data: response,
      message: response ? "Successfully fetch data" : "User Not Present!",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const response = await User.findAll({});

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

const getPropertyRentalDetails = asyncHandler(async (req, res) => {
  try {
    const response = await PropertyRental.findOne({
      where: { loggedInUserId: req.person.id },
    });

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

const getFavoritedPropertiesDetails = asyncHandler(async (req, res) => {
  try {
    const response = await FavoritedProperties.findAll({
      where: { loggedInUserId: req.person.id },
    });

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

const updatePassword = asyncHandler(async (req, res) => {
  try {
    const response = await User.findOne({ where: { id: req.person.id } });

    const { oldPassword, password } = req.body;

    if (!response) {
      return res.status(404).json({
        status: false,
        message: "User not Found, Please Register first!",
      });
    }

    if (!oldPassword || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Please add Old and new password!" });
    }

    const isPassMatch = await checkPassword(
      oldPassword.trim(),
      response.password
    );

    if (response && isPassMatch) {
      response.password = password;
      await response.save();
      return res.status(200).send({
        status: true,
        data: response,
        message: "password changed successfully!",
      });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "oldPassword is incorrect!!" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
});

module.exports = {
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
};
