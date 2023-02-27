const path = require("path");

const { v4: uuidv4 } = require("uuid");

const uploadFileGen = (
  files,
  extensionsValidate = ["png", "jpg", "jpeg", "gif"],
  dir = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    const shortName = archivo.name.split(".");

    const extension = shortName[shortName.length - 1];

    if (!extensionsValidate.includes(extension)) {
      return reject(`Extension '${extension}' no valida`);
    }

    const tempName = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../uploads/", dir, tempName);

    // Use the mv() method to place the file somewhere on your server

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject("Talk to admin");
      }

      resolve(tempName);
    });
  });
};

module.exports = {
  uploadFileGen,
};
