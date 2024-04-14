import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { value_converter } from '../../data';
import moment from 'moment';
import { Api_key } from '../../data';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=200&regionCode=IN&videoCategoryId=${category}&key=${Api_key}`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data.items);
    };
    fetchData();
  }, [category]);

  return (
    <div className='feed'>
      {data.map((item, index) => (
        <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
          <img src={item.snippet.thumbnails.medium.url} alt='' />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
