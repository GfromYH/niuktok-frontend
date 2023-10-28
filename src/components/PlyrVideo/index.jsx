import React,{ useEffect, useState, useRef } from 'react';
import Plyr from 'plyr';
import "plyr/dist/plyr.css";
import PropTypes from 'prop-types';
import settings from './default';
import styles from './index.less';


const PlyrVideo = (props)=>{
  const {videoSrc,videoType} = props
  const videoRef = useRef();

  useEffect(() => {
    if(!videoRef.current) return;

    const playerInstance = new Plyr(videoRef.current, settings);
    

    return () => {
      playerInstance.destroy();
    }
  }, []);

  return (
    <video className={styles.plyrVideo} style={{width: '100%'}} ref={videoRef} controls  playsInline>
      <source size={576} src={videoSrc} type={videoType || 'video/mp4'} />
    </video>
  );
}


PlyrVideo.propTypes={
  id: PropTypes.string.isRequired,
  videoSrc: PropTypes.string.isRequired,
  videoType: PropTypes.string.isRequired
}

PlyrVideo.defaultProps={
  id: '#player',
  videoSrc: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
  videoType: ""
}

export default PlyrVideo