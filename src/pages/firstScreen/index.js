import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import FeedsItem from "../../components/feedsItem";
import Modal from "../../components/Modal";
import SecondScreen from "../secondScreen";

const FirstScreen = () => {
  const [feedsList, setFeedsList] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState(null);

  const getApiData = async () => {
    const apiUrl =
      "https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getfeeds_v1";
    const requestBody = {
      Index: 1,
      ContentType: [2],
      ProductCategory: [],
      PlayListCode: "",
      IsTagged: false,
    };
    const headers = {
      "x-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
      "x-tenant-key": "DIVANOR123",
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(apiUrl, requestBody, { headers });
      setFeedsList(response.data.data.Feeds);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const openModal = (feed) => {
    setSelectedFeed(feed);
  };

  const closeModal = () => {
    setSelectedFeed(null);
  };

  console.log(feedsList);
  return (
    <div className="feeds-container">
      {feedsList.length > 0 &&
        feedsList.map((item) => (
          <div key={item.EngagementPostId} onClick={() => openModal(item)}>
            <FeedsItem source={item.Thumbnail_URL} title={item.Thumbnail_Title} />
          </div>
        ))}

      {selectedFeed && (
        <Modal onClose={closeModal}>
          <SecondScreen selectedFeed={selectedFeed} feedsList={feedsList}/>
        </Modal>
      )}
    </div>
  );
};

export default FirstScreen;
