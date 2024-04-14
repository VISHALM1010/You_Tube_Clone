import React, { useEffect, useState, useParams } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { Api_key, value_converter } from '../../data';
import moment from 'moment';

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelInfo, setChannelInfo] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [showComments, setShowComments] = useState(false); 

  useEffect(() => {
    const fetchVideoData = async () => {
      const video_info_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${Api_key}`;
      try {
        const response = await fetch(video_info_url);
        if (!response.ok) {
          throw new Error('Failed to fetch video data');
        }
        const data = await response.json();
        setApiData(data.items[0]);
      } catch (error) {
        console.error('Error fetching video data:', error.message);
      }
    };

    const fetchChannelData = async () => {
      if (apiData) {
        const Channel_info_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${Api_key}`;
        try {
          const response = await fetch(Channel_info_url);
          if (!response.ok) {
            throw new Error('Failed to fetch channel data');
          }
          const data = await response.json();
          setChannelInfo(data.items[0]);
        } catch (error) {
          console.error('Error fetching channel data:', error.message);
        }
      }
    };

    const fetchCommentData = async () => {
      const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${Api_key}`;
      try {
        const response = await fetch(comment_url);
        if (!response.ok) {
          throw new Error('Failed to fetch comment data');
        }
        const data = await response.json();
        setCommentData(data.items);
      } catch (error) {
        console.error('Error fetching comment data:', error.message);
      }
    };

    fetchVideoData();
    fetchChannelData();
    fetchCommentData();
  }, [videoId, apiData]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className='play-video'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : 'Title Here'}</h3>

      <div className='play-video-info'>
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : '10k'} &bull;{' '}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : '2 days ago'}
        </p>
        <div>
          <span>
            <img src={like} alt='' /> {apiData ? value_converter(apiData.statistics.likeCount) : 155}
          </span>
          <span>
            <img src={dislike} alt='' /> {apiData ? value_converter(apiData.statistics.dislikeCount) : 155}
          </span>
          <span>
            <img src={share} alt='' /> Share
          </span>
          <span>
            <img src={save} alt='' /> Save
          </span>
        </div>
      </div>
      <hr />

      <div className='publisher'>
        <img src={channelInfo ? channelInfo.snippet.thumbnails.default.url : ''} alt='' />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
          <span>{channelInfo ? value_converter(channelInfo.statistics.subscriberCount) : '1M'} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>



   <button className='comment-btn' onClick={toggleComments}>
       Comments
      </button>

 

  


    

     
 

   
      {showComments &&
        commentData.map((item, index) => (
          <div key={index} className='comment'>
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='' />
            <div>
              <h3>
                {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
              </h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className='comment-action'>
                <img src={like} alt='' />
                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt='' />
                <span>{value_converter(item.snippet.topLevelComment.snippet.dislikeCount)}</span>
              </div>
            </div>
          </div>
        ))}

      <div className='vid-description'>
        <p>{apiData ? apiData.snippet.description.slice(0, 256) : 'Description Here'}...</p>
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 230} comments</h4>
      </div>
    </div>
  );
};

export default PlayVideo;
