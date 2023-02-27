const path = require("path");
const fs = require("fs");
const { response, request } = require("express");

const { uploadFileGen } = require("../helpers/index");
const { User, Product } = require("../models");

const uploadFile = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json("No files were uploaded.");
  }

  if (!req.files.archivo) {
    return res.status(400).json("No files were uploaded.");
  }

  try {
    const name = await uploadFileGen(req.files, undefined, "imgs");
    // const name = await uploadFileGen(req.files, ["txt", "md"],"textos"); //*Para guardar archivos de textos en /textos. Es necesario permirtir que express upload cree una carpeta

    res.json({
      name,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "Talk to admin",
    });
  }
};

const updateImg = async (req, res) => {
  const { id, colection } = req.params;

  let model;

  switch (colection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `No existe el user con ID ${id}`,
        });
      }

      break;

    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `No existe Product con ID ${id}`,
        });
      }
      break;

    default:
      res.status(500).json({ msg: "Forgott to validate this" });
      break;
  }

  //limpiar img previa
  if (model.img) {
    //Hay que borrar la img del servidor
    const exist = path.join(__dirname, "../uploads", colection, model.img);

    if (fs.existsSync(exist)) {
      fs.unlinkSync(exist);
    }
  }

  const name = await uploadFileGen(req.files, undefined, colection);

  model.img = name;

  await model.save();

  res.json({
    msg: "Hey put",
    id,
    colection,
  });
};

const showImg = async (req, res) => {
  const { id, colection } = req.params;

  const noImgPath = path.join(__dirname, "../assets", "no-image.png");

  let model;

  switch (colection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res.sendFile(noImgPath);
      }

      break;

    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.sendFile(noImgPath);
      }
      break;

    default:
      res.status(500).json({ msg: "Forgott to validate this" });
      break;
  }

  //limpiar img previa
  if (model.img) {
    //Hay que borrar la img del servidor
    const exist = path.join(__dirname, "../uploads", colection, model.img);

    if (fs.existsSync(exist)) {
      return res.sendFile(exist);
    }
  }

  res.sendFile(noImgPath);
};

module.exports = {
  uploadFile,
  updateImg,
  showImg,
};
