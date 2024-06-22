import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RestaurantInfo = () => {
  const { id } = useParams(); // Fetch restaurant ID from URL params
  const [restaurant, setRestaurant] = useState(null); // State to hold restaurant details
  const API_URL = `http://localhost:5000/api/restaurants/${id}`;

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(API_URL);
        setRestaurant(response.data); // Assuming response.data contains the restaurant details
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        setRestaurant(null); // Reset restaurant state if there's an error
      }
    };

    fetchRestaurant();
  }, [API_URL, id]);

  if (!restaurant) {
    return <div>Loading...</div>; // or handle error or show a message
  }

  return (
    <div>
      <h2>{restaurant.restaurantName}</h2>
      <p>City: {restaurant.city}</p>
      <p>Country: {restaurant.countryCode}</p>
      <p>Cuisines: {restaurant.cuisines.join(", ")}</p>
      <p>Price Range: {restaurant.priceRange}</p>
      <p>
        Rating: {restaurant.ratingText} ({restaurant.aggregateRating})
      </p>
      <p>Online Delivery: {restaurant.hasOnlineDelivery ? "Yes" : "No"}</p>
      <p>Table Booking: {restaurant.hasTableBooking ? "Yes" : "No"}</p>
    </div>
  );
};

export default RestaurantInfo;
