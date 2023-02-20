const dotenv = require("dotenv");
const { Server } = require("./models/server.js");

dotenv.config();

const server = new Server();

server.listen();
