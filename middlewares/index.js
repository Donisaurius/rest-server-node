const validateUser = require("./validate-user");
const validateJwt = require("./validate-jwt");
const validateRoles = require("./validate-roles");

module.exports = {
  ...validateUser,
  ...validateJwt,
  ...validateRoles,
};
