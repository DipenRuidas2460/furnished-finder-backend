const fs = require("fs");
const path = require("path");

const getPetImage = async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = "../uploads/petImage/" + fileName;
  const profImgPath = path.join(__dirname, filePath);
  const fileImg = await fs.readFileSync(profImgPath);
  res.write(fileImg);
  res.end();
};

const getPropertyImage = async (req, res) => {
  const fileName = req.params.fileName;
  const filePath = "../uploads/propertyImg/" + fileName;
  const profImgPath = path.join(__dirname, filePath);
  const fileImg = await fs.readFileSync(profImgPath);
  res.write(fileImg);
  res.end();
};

module.exports = { getPetImage, getPropertyImage };