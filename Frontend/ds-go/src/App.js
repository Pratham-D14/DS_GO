import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Array from "./Pages/Array";
import "./App.css";
import InteractiveAnimation from "./Pages/Array/Components/InteractiveAnimation/InteractiveAnimation";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/array" element={<Array />} />
          <Route
            path="/interactiveAnimation"
            element={<InteractiveAnimation />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
