const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    restaurantID: {
      type: Number,
      required: true,
      unique: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    countryCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    localityVerbose: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    cuisines: {
      type: [String],
      required: true,
    },
    averageCostForTwo: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    hasTableBooking: {
      type: Boolean,
      required: true,
    },
    hasOnlineDelivery: {
      type: Boolean,
      required: true,
    },
    isDeliveringNow: {
      type: Boolean,
      required: true,
    },
    switchToOrderMenu: {
      type: Boolean,
      required: true,
    },
    priceRange: {
      type: Number,
      required: true,
    },
    aggregateRating: {
      type: String,
      required: true,
    },
    ratingColor: {
      type: String,
      required: true,
    },
    ratingText: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
