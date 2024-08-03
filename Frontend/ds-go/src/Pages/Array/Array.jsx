import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../components/navbar";
import "./Array.css";
import AnimatedArray from "./Components/animation";
import InteractiveAnimation from "./Components/InteractiveAnimation/InteractiveAnimation";

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
    // Enter fullscreen
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen mode:", err);
        });
      } else if (videoRef.current.mozRequestFullScreen) {
        // Firefox
        videoRef.current.mozRequestFullScreen().catch((err) => {
          console.error("Error attempting to enable fullscreen mode:", err);
        });
      } else if (videoRef.current.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        videoRef.current.webkitRequestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen mode:", err);
        });
      } else if (videoRef.current.msRequestFullscreen) {
        // IE/Edge
        videoRef.current.msRequestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen mode:", err);
        });
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.fullscreenElement) {
        // Check if document is in fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          // Firefox
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          // Chrome, Safari, and Opera
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          // IE/Edge
          document.msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    }
  };

  // Event listener for click outside video
  const handleClickOutside = (event) => {
    if (
      isFullscreen &&
      videoRef.current &&
      !videoRef.current.contains(event.target)
    ) {
      // Check if the click was outside the video element and not in fullscreen mode
      toggleFullscreen();
    }
  };

  useEffect(() => {
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
            <span className="highlight">
              way to organize data in a computer
            </span>{" "}
            so that it is easy to find and use. Imagine it as a row of boxes,
            where each box holds one piece of information, like a number or a
            word. This makes it easy to keep track of and use many pieces of
            data with one name.
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
