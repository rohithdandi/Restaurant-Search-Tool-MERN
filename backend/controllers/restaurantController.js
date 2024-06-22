const Restaurant = require("../models/restaurantModel");
const fs = require("fs").promises;

// @desc    return all restaurants data
// @route   GET /api/restaurants/
// @access  Public
const getRestaurants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    let country = req.query.country || "All";
    let cuisine = req.query.cuisine || "All";

    const countryOptions = {
      India: 1,
      Australia: 14,
      Brazil: 30,
      Canada: 37,
      Indonesia: 94,
      "New Zealand": 148,
      Phillipines: 162,
      Qatar: 166,
      Singapore: 184,
      "South Africa": 189,
      "Sri Lanka": 191,
      Turkey: 208,
      UAE: 214,
      "United Kingdom": 215,
      "United States": 216,
    };

    let countryCodes;

    if (country === "All") {
      countryCodes = ["All"];
    } else if (Array.isArray(country)) {
      countryCodes = country.map((c) => countryOptions[c] || c);
    } else {
      countryCodes = countryOptions[country];
    }

    let query = {
      restaurantName: { $regex: search, $options: "i" },
    };

    if (country !== "All") {
      query.countryCode = { $in: countryCodes };
    }

    if (cuisine !== "All") {
      query.cuisines = { $in: [cuisine] };
    }

    const restaurants = await Restaurant.find(query)
      .skip(page * limit)
      .limit(limit);

    const total = await Restaurant.countDocuments({
      restaurantName: { $regex: search, $options: "i" },
    });

    const response = {
      total,
      page: page + 1,
      limit,
      restaurants,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// @desc    find restaurant info
// @route   GET /api/restaurants/
// @access  Public
const getRestaurantInfo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const restaurant = await Restaurant.findOne({ restaurantID: id });

    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    res.status(200).json(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getRestaurants,
  getRestaurantInfo,
};
