import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantInfo from "./pages/RestaurantInfo";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantInfo />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
