const { Category } = require("../models");

const categoryExist = async (id = "") => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }
};

module.exports = categoryExist;
