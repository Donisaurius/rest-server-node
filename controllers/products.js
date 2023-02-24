const { response, request } = require("express");
const Product = require("../models/product");

const products = async (req = request, res = response) => {
  const { limit = 10, skip = 0 } = req.query;

  try {
    const query = { state: true };
    const productQuery = Product.find(query)
      .skip(Number(skip))
      .limit(Number(limit))
      .populate(["user", "category"]);

    const totalDocsQuery = Product.countDocuments(query);

    const [products, totalDocs] = await Promise.all([
      productQuery,
      totalDocsQuery,
    ]);

    return res.json({
      msg: "Productos",
      totalDocs,
      products,
    });
  } catch (error) {
    console.log("errror en products");
    return res.status(500).json({
      msg: "Talk to administrator",
    });
  }
};
const detail = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate(
      "user category",
      "name name"
    );
    res.json({
      msg: "Product",
      product,
    });
  } catch (error) {
    console.log("errror en detail products");
    return res.status(500).json({
      msg: "Talk to administrator",
    });
  }
};
const create = async (req = request, res = response) => {
  const { name, ...data } = req.body;

  data.name = name.toUpperCase();

  try {
    const product = new Product(data);

    await product.save();

    res.json({
      msg: "Product created",
      product,
    });
  } catch (error) {
    console.log("errror en create products");
    return res.status(500).json({
      msg: "Talk to administrator",
    });
  }
};

const update = async (req = request, res = response) => {
  const { name, ...data } = req.body;
  const { id } = req.params;

  data.name = name.toUpperCase();
  data.user = req.user._id;

  try {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json({
      msg: "Producto actualizado",
      product,
    });
  } catch (error) {
    console.log("errror en update products");
    return res.status(500).json({
      msg: "Talk to administrator",
    });
  }
};
const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndUpdate(id, { state: false });

    res.json({
      msg: "Product deleted",
    });
  } catch (error) {
    console.log("errror en deleteProduct products");
    return res.status(500).json({
      msg: "Talk to administrator",
    });
  }
};

module.exports = {
  products,
  detail,
  create,
  update,
  deleteProduct,
};
