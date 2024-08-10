const schemas = require("../../../Utils/db/Models.js");
const {NotFoundError} = require("../../../Utils/Errors/index.js");

const DisplayProductById = async (req, res) => {
  // #swagger.tags = ["Client / Product"]
  // #swagger.description = "Display detailed information about a selected meal."
  // #swagger.summary = 'Display product details'
  // #swagger.security = []

  const productId = req.params.productId;
  meal = await schemas.Meal.findOne({ id: productId });

  if (!meal) throw new NotFoundError("Not Found Error", "Product not found");

  const { name, description, price, image_url, toppings } = meal;

  res.status(200).send({
    message: "Product displayed",
    info: { name, description, price, image_url, toppings },
  });
};

module.exports = {
  DisplayProductById,
};
