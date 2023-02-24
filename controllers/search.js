const { response, request } = require("express");
const { User } = require("../models");
const { ObjectId } = require("mongoose").Types;

const colectionAvailable = ["Users", "Categories", "Products", "Roles"];

const findUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);

    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  res.json({
    results: users,
  });
};

const search = (req = request, res = response) => {
  const { colection, term } = req.params;

  if (!colectionAvailable.includes(colection)) {
    return res.status(400).json({
      msg: `LAS COLECCIONES PERMITIDAS SON: ${colectionAvailable}`,
    });
  }

  switch (colection) {
    case "Users":
      findUsers(term, res);
      break;
    case "Categories":
      break;
    case "Products":
      break;
    default:
      res.status(500).json({
        msg: "Working in that search",
      });
      break;
  }

  try {
  } catch (error) {
    console.log("error search controller", error);
    res.status(500).json({
      msg: "Talk to admin",
    });
  }
};

module.exports = {
  search,
};
