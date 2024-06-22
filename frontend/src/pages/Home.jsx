import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../components/Pagination";

const Home = () => {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [filterCountry, setFilterCountry] = useState("All");
  const [filterCuisine, setFilterCuisine] = useState("All");
  const [totalPages, setTotalPages] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/restaurants/";

  const countryList = [
    "All",
    "India",
    "Australia",
    "Brazil",
    "Canada",
    "Indonesia",
    "New Zealand",
    "Philippines",
    "Qatar",
    "Singapore",
    "South Africa",
    "Sri Lanka",
    "Turkey",
    "UAE",
    "United Kingdom",
    "United States",
  ];

  const cuisineList = [
    "All",
    "Afghani",
    "African",
    "American",
    "Andhra",
    "Arabian",
    "Argentine",
    "Armenian",
    "Asian",
    "Asian Fusion",
    "Assamese",
    "Australian",
    "Awadhi",
    "BBQ",
    "Bakery",
    "Bar Food",
    "Belgian",
    "Bengali",
    "Beverages",
    "Bihari",
    "Biryani",
    "Brazilian",
    "Breakfast",
    "British",
    "Bubble Tea",
    "Burger",
    "Burmese",
    "Börek",
    "Cafe",
    "Cajun",
    "Canadian",
    "Cantonese",
    "Caribbean",
    "Charcoal Grill",
    "Chettinad",
    "Chinese",
    "Coffee and Tea",
    "Contemporary",
    "Continental",
    "Cuban",
    "Cuisine Varies",
    "Curry",
    "Deli",
    "Desserts",
    "Dim Sum",
    "Diner",
    "Drinks Only",
    "Durban",
    "Döner",
    "European",
    "Fast Food",
    "Filipino",
    "Finger Food",
    "Fish and Chips",
    "French",
    "Fusion",
    "German",
    "Goan",
    "Gourmet Fast Food",
    "Greek",
    "Grill",
    "Gujarati",
    "Hawaiian",
    "Healthy Food",
    "Hyderabadi",
    "Ice Cream",
    "Indian",
    "Indonesian",
    "International",
    "Iranian",
    "Irish",
    "Italian",
    "Izgara",
    "Japanese",
    "Juices",
    "Kashmiri",
    "Kebab",
    "Kerala",
    "Kiwi",
    "Korean",
    "Latin American",
    "Lebanese",
    "Lucknowi",
    "Maharashtrian",
    "Malay",
    "Malaysian",
    "Malwani",
    "Mangalorean",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Mineira",
    "Mithai",
    "Modern Australian",
    "Modern Indian",
    "Moroccan",
    "Mughlai",
    "Naga",
    "Nepalese",
    "New American",
    "North Eastern",
    "North Indian",
    "Oriya",
    "Pakistani",
    "Parsi",
    "Patisserie",
    "Peranakan",
    "Persian",
    "Peruvian",
    "Pizza",
    "Portuguese",
    "Pub Food",
    "Rajasthani",
    "Ramen",
    "Raw Meats",
    "Restaurant Cafe",
    "Salad",
    "Sandwich",
    "Scottish",
    "Seafood",
    "Singaporean",
    "Soul Food",
    "South African",
    "South American",
    "South Indian",
    "Southern",
    "Southwestern",
    "Spanish",
    "Sri Lankan",
    "Steak",
    "Street Food",
    "Sunda",
    "Sushi",
    "Taiwanese",
    "Tapas",
    "Tea",
    "Teriyaki",
    "Tex-Mex",
    "Thai",
    "Tibetan",
    "Turkish",
    "Turkish Pizza",
    "Unknown",
    "Vegetarian",
    "Vietnamese",
    "Western",
    "World Cuisine",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}?page=${page}&country=${filterCountry}&cuisine=${filterCuisine}&search=${search}`
        );
        setData(response.data);
        setTotalPages(Math.ceil(response.data.total / response.data.limit));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, filterCountry, filterCuisine, search]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleCountryChange = (event) => {
    setFilterCountry(event.target.value);
  };

  const handleCuisineChange = (event) => {
    setFilterCuisine(event.target.value);
  };

  return (
    <div className="flex-col w-full h-screen items-center justify-center mt-2">
      <div className="flex justify-center mb-2">
        <input
          type="text"
          className="flex px-4 py-2 border border-black rounded-md focus:outline-none focus:border-blue-500 text-black"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <div className="w-3/4">
          {data.restaurants.map((restaurant) => (
            <div
              key={restaurant.restaurantID}
              className="mb-4 p-4 border border-black rounded-lg"
            >
              <p className="text-xl">
                <Link
                  to={`/restaurant/${restaurant.restaurantID}`}
                  className="hover:underline"
                >
                  {restaurant.restaurantName}
                </Link>
              </p>
            </div>
          ))}
        </div>
        <div className="w-1/4 p-4 border border-black rounded-md">
          <p>Filter By Country</p>
          <div className="w-full mb-4">
            <select
              className="w-full px-4 py-2 border border-black rounded-md"
              value={filterCountry}
              onChange={handleCountryChange}
            >
              {countryList.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <p>Filter By Cuisine</p>
          <div className="w-full">
            <select
              className="w-full px-4 py-2 border border-black rounded-md"
              value={filterCuisine}
              onChange={handleCuisineChange}
            >
              {cuisineList.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Pagination totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default Home;
