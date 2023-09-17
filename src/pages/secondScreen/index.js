import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedsItem from "../../components/feedsItem";
import './index.css'

const SecondScreen = ({ selectedFeed, feedsList }) => {
  const [feedData, setFeedData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const numVideosToShow = 5; 

  useEffect(() => {
    const initialIndex = feedsList.findIndex(
      (feed) => feed.EngagementPostId === selectedFeed.EngagementPostId
    );
    setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
  }, [selectedFeed, feedsList]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getPostContent?eid=${selectedFeed.EngagementPostId}`;
      const headers = {
        "x-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
        "x-tenant-key": "DIVANOR123",
        "Content-Type": "application/json",
      };
      try {
        const response = await axios.get(apiUrl, { headers });
        setFeedData(response.data.data);
      } catch (error) {
        console.error("Error fetching content URL:", error);
      }
    };

    fetchData();
  }, [selectedFeed]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? feedsList.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === feedsList.length - 1 ? 0 : prevIndex + 1
    );
  };

  let startIndex;
  if (feedsList.length <= numVideosToShow) {
    startIndex = 0;
  } else if (currentIndex <= 1) {
    startIndex = 0;
  } else if (currentIndex >= feedsList.length - 2) {
    startIndex = feedsList.length - numVideosToShow;
  } else {
    startIndex = currentIndex - Math.floor(numVideosToShow / 2);
  }

  startIndex = (startIndex + feedsList.length) % feedsList.length;

  const endIndex = (startIndex + numVideosToShow) % feedsList.length;
  const videosToRender = feedsList.slice(startIndex, endIndex + 1);

  return (
    <div className="second-screen-container">
      <div onClick={prevSlide}>
        <button className="buttons">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>
      <div className="video-list">
        {videosToRender.map((item, index) => (
          <div
            className={`video-item ${index === Math.floor(numVideosToShow / 2) ? "selected" : "blur"}`}
            key={item.EngagementPostId}
          >
            <FeedsItem source={item.Thumbnail_URL} />
          </div>
        ))}
      </div>
      <div onClick={nextSlide}>
        <button className="buttons">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default SecondScreen;
