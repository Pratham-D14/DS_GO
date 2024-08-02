import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Array from "./Pages/Array";
import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/array" element={<Array />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
