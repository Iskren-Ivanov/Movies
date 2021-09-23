import React, { useRef, useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { InputGroup, FormControl } from 'react-bootstrap';
import MovieBox from '../MovieBox/MovieBox';
import './Movie.css';

const Movie = ({ location }) => {
  const getRating = (id) => {
    let ratingsArr = JSON.parse(localStorage.getItem('ratings'));
    let currentMovieObj;
    if (ratingsArr) {
      currentMovieObj = ratingsArr.find((obj) => obj.id === id);
    }
    return currentMovieObj ? currentMovieObj.rating : 0;
  };
  let keyCounter = 0;
  const id = location.state.id;
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(getRating(id));
  const inputEl = useRef(null);

  useEffect(() => {
    getComments();
  }, []);

  const ratingChanged = (newRating) => {
    addedRatingInLocalStore(newRating);
    setRating(newRating);
  };

  const addedRatingInLocalStore = (value) => {
    let ratingsArr = JSON.parse(localStorage.getItem('ratings'));
    if (!ratingsArr) {
      ratingsArr = [{ id, rating: value }];
    } else {
      const currentMovieObj = ratingsArr.find((obj, index) => obj.id === id);
      currentMovieObj.rating = value;
    }
    localStorage.setItem('ratings', JSON.stringify(ratingsArr));
  };

  const addedCommentInLocalStore = (currentComment) => {
    let commentsLocalStore = JSON.parse(
      localStorage.getItem('commentsLocalStore')
    );
    if (!commentsLocalStore) {
      commentsLocalStore = [{ id, comments: [] }];
    }
    commentsLocalStore.forEach((obj) => {
      if (obj.id === id) {
        obj.comments.push(currentComment);
      }
    });

    localStorage.setItem(
      'commentsLocalStore',
      JSON.stringify(commentsLocalStore)
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addedCommentInLocalStore(inputEl.current.value);
      inputEl.current.value = '';
      getComments();
    }
  };

  const getComments = () => {
    const commentsLocalStore = JSON.parse(
      localStorage.getItem('commentsLocalStore')
    );
    if (commentsLocalStore) {
      const currentComments = commentsLocalStore.find((obj) => obj.id === id);
      currentComments && setComments(currentComments.comments);
    }
  };

  return (
    <div className='movie-container'>
      <div className='movie-container__top'>
        <MovieBox movie={location.state} isAClickBox={false} />
      </div>
      <div className='movie-container__bottom'>
        <div className='movie-container__bottom-review'>
          <h4>Your Review</h4>
          <div className='movie-container__bottom-review-stars'>
            <ReactStars
              editing={true}
              count={5}
              value={rating}
              onChange={ratingChanged}
              size={40}
              activeColor='#ffd700'
            />
          </div>
        </div>
        <InputGroup
          className='form-group movie-container__bottom-input-group'
          onKeyDown={handleKeyDown}
        >
          <FormControl
            as='textarea'
            ref={inputEl}
            className='movie-container__bottom-input'
            placeholder='Your private notes and comments about the movie...'
          />
        </InputGroup>
        {comments.length > 0 && (
          <div className='movie-container__bottom-comments-box'>
            <h4>Private Comments</h4>
            <div className='movie-container__bottom-comments-content'>
              {comments.map((comment) => (
                <p key={keyCounter++}>
                  <b>Anonymous:</b> {comment}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
