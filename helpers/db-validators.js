const Product = require("../models/product.js");
const Role = require("../models/roles.js");
const User = require("../models/user.js");

const roleValidator = async (role = "") => {
  const existRole = await Role.findOne({ role });

  if (!existRole) {
    throw new Error("El role no existe");
  }
};

const emailExist = async (email = "") => {
  //Verificar si el correo existe
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error("Este correo ya existe");
  }
};
const existUserById = async (id = "") => {
  //Verificar si el correo existe
  const user = await User.findById(id);

  if (!user) {
    throw new Error("Este usuario no existe ");
  }
};

const productExist = async (id = "") => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Este product no existe ");
  }
};

module.exports = {
  roleValidator,
  emailExist,
  existUserById,
  productExist,
};
