import React, { useState, useEffect } from 'react';
import './RecommendedVideo.css';
import { Api_key, value_converter } from '../../data';
import { Link } from 'react-router-dom';

const RecommendedVideo = ({ categoryId }) => {
    const [apidata, setApidata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!categoryId) return; 
            setLoading(true);
            try {
                const related_video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&videoCategoryId=${categoryId}&key=${Api_key}`;
                const response = await fetch(related_video_url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setApidata(data.items);
            } catch (error) {
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [categoryId]);



    return (
        <div className='recommended'>
            {apidata.map((item, index) => (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className="video-info">
                        <h4>{item.snippet.title}</h4>
                        <h3>{item.snippet.channelTitle}</h3>
                        <p>{value_converter(item.statistics.viewCount)} Views</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default RecommendedVideo;
