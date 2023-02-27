const validateUser = require("./validate-user");
const validateJwt = require("./validate-jwt");
const validateRoles = require("./validate-roles");
const validateFile = require("./validateFile");

module.exports = {
  ...validateUser,
  ...validateJwt,
  ...validateRoles,
  ...validateFile,
};
