const dbValidator = require("./db-validators");
const generateJWT = require("./generateJWT");
const validateFile = require("./validateFile");

module.exports = {
  ...dbValidator,
  ...generateJWT,
  ...validateFile,
};
