const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//const csv = require("csv-parser");
//const fs = require("fs");
//const Restaurant = require("./models/restaurantModel");

// const insertRestaurants = async () => {
//   try {
//     const results = [];
//     const processCSV = () => {
//       return new Promise((resolve, reject) => {
//         fs.createReadStream("./zomato.csv")
//           .pipe(csv())
//           .on("data", (data) => {
//             const transformedData = {
//               restaurantID: Number(data["Restaurant ID"]),
//               restaurantName: data["Restaurant Name"],
//               countryCode: Number(data["Country Code"]),
//               city: data["City"],
//               address: data["Address"],
//               locality: data["Locality"],
//               localityVerbose: data["Locality Verbose"],
//               longitude: data["Longitude"],
//               latitude: data["Latitude"],
//               cuisines: data["Cuisines"]
//                 ? data["Cuisines"].split(",").map((cuisine) => cuisine.trim())
//                 : ["Unknown"],
//               averageCostForTwo: Number(data["Average Cost for two"]),
//               currency: data["Currency"],
//               hasTableBooking: data["Has Table booking"] === "Yes",
//               hasOnlineDelivery: data["Has Online delivery"] === "Yes",
//               isDeliveringNow: data["Is delivering now"] === "Yes",
//               switchToOrderMenu: data["Switch to order menu"] === "Yes",
//               priceRange: Number(data["Price range"]),
//               aggregateRating: data["Aggregate rating"],
//               ratingColor: data["Rating color"],
//               ratingText: data["Rating text"],
//               votes: Number(data["Votes"]),
//             };

//             results.push(transformedData);
//           })
//           .on("end", () => resolve(results))
//           .on("error", (err) => reject(err));
//       });
//     };

//     const restaurantData = await processCSV();

//     try {
//       await Restaurant.insertMany(restaurantData);
//       console.log("Data uploaded successfully");
//     } catch (err) {
//       console.log("Failed to upload data:", err);
//     }
//   } catch (err) {
//     console.log("Internal Server Error:", err);
//   }
// };

//insertRestaurants();

app.use("/api/restaurants", require("./routes/restaurantRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
