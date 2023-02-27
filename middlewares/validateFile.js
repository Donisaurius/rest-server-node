const validateFile = (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({
      msg: "No se envió archivo a guardar",
    });
  }

  next();
};

module.exports = { validateFile };
