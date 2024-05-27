import './App.css';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp, faEye} from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';git 

function App() {
  const [comments, setComments] = useState([]);
  const [video, setVideo] = useState({});

  useEffect(() => {
    const settings1 = {
      async: true,
      crossDomain: true,
      url: 'https://youtube-media-downloader.p.rapidapi.com/v2/video/comments?videoId=c1EgEFWDMGo&sortBy=top',
      method: 'GET',
      headers: {
        'x-rapidapi-key': '<your-token>',
        'x-rapidapi-host': 'youtube-media-downloader.p.rapidapi.com'
      }
    };

    const settings2 = {
      async: true,
      crossDomain: true,
      url: 'https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=c1EgEFWDMGo',
      method: 'GET',
      headers: {
        'x-rapidapi-key': '<your-token>',
        'x-rapidapi-host': 'youtube-media-downloader.p.rapidapi.com'
      }
    };
    
    $.ajax(settings1).done(function (response) {
      setComments(response.items);
      console.log(response);
    });

    $.ajax(settings2).done(function (response) {
      setVideo(response);
      console.log(response);
    });
  }, []);

  return (
    <div className="App">
      <div className="card">
        {video.thumbnails && video.thumbnails.length >= 5 && (
          <img src={video.thumbnails[4].url} className="card-img-top" alt="..." />
        )}
        <div className="card-body">
          {video.channel && video.channel.name && (
            <p className="card-text">{video.channel.name}</p>
          )}
          <h5 className="card-title">{video.title}</h5>
          <div className='video-rates'>
            <h5 className="card-title">{video.viewCount}<FontAwesomeIcon className="icons" icon={faEye}/></h5>
            <h5 className="card-title">{video.likeCount}<FontAwesomeIcon className="icons" icon={faThumbsUp}/></h5>
          </div>
          <a href={`https://www.youtube.com/watch?v=${video.id}`} target='_blank' className="btn btn-primary">İzle</a>
        </div>
      </div>
      <div className="list-group">
        {comments.map((comment) => (
          <a href="#" key={comment.id} className="list-group-item list-group-item-action" aria-current="true">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{comment.channel.name}</h5>
              <small>{comment.publishedTimeText}</small>
            </div>
            <p className="mb-1">{comment.contentText}</p>
            {comment.voteCountText > 0 && (
              <small className='comment-rate'>
                {comment.voteCountText}
                <FontAwesomeIcon className="icons" icon={faThumbsUp}/>
              </small>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
