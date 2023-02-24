const { request, response } = require("express");
const { Category } = require("../models");

const categories = async (req = request, res = response) => {
  const { limit = 10, skip = 0 } = req.query;

  try {
    const query = { state: true };
    const categoriesQuery = await Category.find(query)
      .skip(Number(skip))
      .limit(Number(limit));
    const totalDocsQuery = await Category.countDocuments(query);

    const [categories, totalDocs] = await Promise.all([
      categoriesQuery,
      totalDocsQuery,
    ]);

    res.json({
      msg: "Categorias listadas",
      categories,
      totalDocs,
    });
  } catch (error) {
    console.log("error obteniendo categorias", error);
    res.status(500).json({
      msg: "Hable al admin",
    });
  }
};

const details = async (req = request, res = response) => {
  try {
    const category = await Category.findById(req.params.id).populate("user");

    res.json({
      msg: "Category found",
      category,
    });
  } catch (error) {
    console.log("Error en detalle de la categoria", error);
    res.status(500).json({
      msg: "Talk to admin",
    });
  }
};

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  try {
    const categoryDb = await Category.findOne({ name });

    if (categoryDb) {
      return res.status(400).json({
        msg: "La categoria ya existe",
      });
    }

    const data = {
      name,
      user: req.user._id,
    };

    const category = new Category(data);

    await category.save();

    res.status(201).json({
      msg: "Create categoria",
      category,
    });
  } catch (error) {
    console.log("error creando la category", error);
    res.status(500).json({
      msg: "Hable con admin",
    });
  }
};

const update = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, ...data } = req.body;
  data.user = req.user._id;
  data.name = name.toUpperCase();

  try {
    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.json({
      msg: "Update categoria",
      category,
    });
  } catch (error) {
    console.log("error actualizando category", error);
    res.status(500).json({
      msg: "Talk to admin",
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndUpdate(id, { state: false });

    res.json({
      msg: "deleteCategory categoria",
    });
  } catch (error) {
    console.log("error eliminando category ", error);
    res.status(500).json({
      msg: "Talk to admin",
    });
  }
};

module.exports = {
  categories,
  details,
  createCategory,
  update,
  deleteCategory,
};
