import React from 'react'

import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import RecommendedVideo from '../../Components/RecommemdedVideo/RecommendedVideo'
import { useParams } from 'react-router-dom'

const Video = () => {
  const {videoId,categoryId} = useParams();
  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId} />
      <RecommendedVideo categoryId={categoryId}/>
    </div>
  )
}


export default Video
