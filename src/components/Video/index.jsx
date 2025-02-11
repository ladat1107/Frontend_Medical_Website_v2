import React from 'react';
import ReactPlayer from 'react-player';
import './videoComponent.scss';  // Import file SCSS

const VideoComponent = () => {
  return (
    <div className="video-wrapper">
      <ReactPlayer 
        url="https://www.youtube.com/watch?v=zfmhCJgWx8Y"  
        controls={true}  
      />
    </div>
  );
};

export default VideoComponent;
