const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.js");

const getUsers = async (req, res = response) => {
  const { limit = 5, page = 0 } = req.query;

  const query = { state: true };

  const usersQuery = User.find(query).skip(Number(page)).limit(Number(limit));

  const totalDocsQuery = User.countDocuments(query); //Codigo que va a hacer esperar la peticion

  const [users, totalDocs] = await Promise.all([usersQuery, totalDocsQuery]);

  res.status(200).json({
    ok: true,
    msg: "Users found",
    users,
    totalDocs,
  });
};

const putUsers = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  //TODO: Validar contra DB
  if (password) {
    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.status(403).json({
    ok: true,
    msg: "update",
    user,
  });
};

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  //Encriptar password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //Save
  try {
    await user.save();
    return res.status(200).json({
      ok: true,
      msg: "create",
      user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error creando usuario",
    });
    throw new Error("Error guardando usuario", error);
  }
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  await User.findByIdAndUpdate(id, { state: false });

  res.status(202).json({
    ok: true,
    msg: "Delete user with id " + id,
    user,
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
};
