const { response } = require("express");

const getUsers = (req, res = response) => {
  const queries = req.query;

  res.status(403).json({
    ok: true,
    msg: "hello - controller",
    queries,
  });
};

const putUsers = (req, res) => {
  res.status(403).json({
    ok: true,
    msg: "update",
  });
};

const postUsers = (req, res) => {
  const body = req.body;

  res.status(403).json({
    ok: true,
    msg: "create",
    body,
  });
};

const deleteUsers = (req, res) => {
  const { id } = req.params;

  res.status(202).json({
    ok: true,
    msg: "Delete user with id " + id,
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
};
