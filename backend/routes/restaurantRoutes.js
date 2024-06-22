const express = require("express");
const router = express.Router();

const {
  getRestaurants,
  getRestaurantInfo,
} = require("../controllers/restaurantController");

router.get("/", getRestaurants);
router.get("/:id", getRestaurantInfo);

module.exports = router;
