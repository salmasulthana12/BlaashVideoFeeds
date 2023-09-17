import React from 'react';
import './index.css'

const FeedsItem = (props) => {
  return (
    <div className="feeds-list">
        <video controls width="400" className="styling-video" autoPlay>
              <source src={props.source} type="video/mp4" />
            </video>
            {props.title &&<div className="feeds-heading">
              <h2 className="video-heading">{props.title}</h2>
            </div>}
    </div>
  )
}

export default FeedsItem