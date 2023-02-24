const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../db/config.js");

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      users: "/api/users",
    };

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
    this.app.use(this.paths.auth, require("../routes/auth.js"));
    this.app.use(this.paths.categories, require("../routes/categories.js"));
    this.app.use(this.paths.products, require("../routes/products.js"));
    this.app.use(this.paths.search, require("../routes/search.js"));
    this.app.use(this.paths.users, require("../routes/user.js"));
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
