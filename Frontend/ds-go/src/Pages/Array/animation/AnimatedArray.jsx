// src/AnimatedArray.js

import React, { useState, useEffect } from "react";
import "./AnimatedArray.css";

const AnimatedArray = () => {
  // Array data
  const arrayItems = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
  // State to track the highlighted index
  const [highlightIndex, setHighlightIndex] = useState(0);

  // Effect to animate the highlighting
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prevIndex) => (prevIndex + 1) % arrayItems.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [arrayItems.length]);

  return (
    <div className="array-container">
      {arrayItems.map((item, index) => (
        <div
          key={index}
          className={`array-box ${index === highlightIndex ? "highlight" : ""}`}
        >
          <div className="item">{item}</div>
          <div className="index">Index: {index}</div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedArray;
