import React from "react";
import "./HomePage.css";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const logoUrl = "path/to/logo.png";
  const links = [
    { name: "Topics", url: "/topics" },
    { name: "About Us", url: "/about" },
    { name: "Practice", url: "/practice" },
  ];

  const navigate = useNavigate();
  function handleclick() {
    navigate("/array");
  }
  return (
    <>
      <Navbar links={links} />
      <div className="screen-1">
        <h1>Topics</h1>
        <div className="topics">
          <div className="array topic-div">
            <p>Array</p>
            <a className="learn" onClick={handleclick}>
              Learn
            </a>
          </div>
          <div className="stack topic-div">
            <p>Stack</p>
            <a className="learn">Learn </a>
          </div>
          <div className="queue topic-div">
            <p>Queue</p>
            <a className="learn">Learn </a>
          </div>
          <div className="linkedList topic-div">
            <p>Linked List</p>
            <a className="learn">Learn </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
