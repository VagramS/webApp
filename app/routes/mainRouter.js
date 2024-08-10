const router = require("express-promise-router")();

const { Admin_Router } = require("./admin/router");
const { Client_Router } = require("./client/router");
const { Swagger_Router } = require("./swagger/router");

router.use("/client", Client_Router);
router.use("/admin", Admin_Router);
router.use("/api-docs", Swagger_Router);

module.exports = {
  Admin_Router,
  Client_Router,
  Swagger_Router,
};
