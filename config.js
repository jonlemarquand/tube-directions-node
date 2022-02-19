const dotenv = require('dotenv');
dotenv.config();

const config = {
  db: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "expresstest",
  },
  listPerPage: 10,
};
module.exports = config;