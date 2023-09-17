// src/components/VideoSlider.js
import React from 'react';

function VideoSlider({ videoUrl }) {
  return (
    <div className="video-slider">
      <video controls autoPlay>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Add additional videos in the slider */}
    </div>
  );
}

export default VideoSlider;
