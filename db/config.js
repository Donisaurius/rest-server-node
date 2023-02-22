const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT);

    console.log("CONNECTED TO DATA BASE");
  } catch (error) {
    throw new Error("Error al conectarse con la DB");
  }
};

module.exports = {
  dbConnection,
};
