const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config.js");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.userRoutes = "/api/users";

    // CONECTAR A DB
    this.connectDb();

    //Middlewares
    this.middlewares();
    //Rutas de la app

    this.routes();
  }

  async connectDb() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    //Parsear info del body
    this.app.use(express.json());

    //Directorio public
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.userRoutes, require("../routes/user.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("app running in ", this.port);
    });
  }
}

module.exports = {
  Server,
};
