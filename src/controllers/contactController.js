const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");

const createContactList = asyncHandler(async (req, res) => {
  try {
    const { email, phone, otherContact } = req.body;
    const obj = {
      email,
      phone,
      otherContact,
      loggedInUserId: req.person.id,
    };
    const contactData = await Contact.create(obj);
    const response = await contactData.save();
    return res.status(201).json({
      status: true,
      response: response,
      message: "Contact Data created successfully!",
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong", error: err });
  }
});

const getContactByContactId = asyncHandler(async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const response = await Contact.findOne({
      where: { id: contactId },
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

const updateContact = asyncHandler(async (req, res) => {
  try {
    const response = await Contact.update(req.body, {
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

const deleteContact = asyncHandler(async (req, res) => {
  try {
    await Contact.destroy({
      where: { loggedInUserId: req.person.id },
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
  createContactList,
  getContactByContactId,
  updateContact,
  deleteContact,
};
