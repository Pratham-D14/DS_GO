import React, { useState, useRef } from "react";
import Navbar from "../../components/navbar";
import "./Array.css";
import AnimatedArray from "./animation";

const Array = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);

  const logoUrl = "path/to/logo.png";
  const links = [
    { name: "Topics", url: "/topics" },
    { name: "About Us", url: "/about" },
    { name: "Practice", url: "/practice" },
  ];

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        // IE/Edge
        videoRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Event listener for click outside video
  const handleClickOutside = (event) => {
    if (isFullscreen && !videoRef.current.contains(event.target)) {
      toggleFullscreen();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isFullscreen]);

  return (
    <div className="array-page">
      <Navbar links={links} />
      <div className="array-content">
        <div className="textanimation">
          <h1 className="heading">Array is Simple!</h1>
          <p className="defination">
            An array is a{" "}
            <span className="highlight">way to organize data</span> in a
            computer so that it is easy to find and use. Imagine it as a row of
            boxes, where each box holds one piece of information, like a number
            or a word. This makes it easy to keep track of and use many pieces
            of data with one name.
          </p>
          <AnimatedArray />
        </div>
        <div
          className={`video ${isFullscreen ? "fullscreen" : ""}`}
          onClick={toggleFullscreen}
        >
          <video
            ref={videoRef}
            controls
            src={require("../../Videos/array.mp4")}
          ></video>
        </div>
      </div>
    </div>
  );
};

export default Array;
