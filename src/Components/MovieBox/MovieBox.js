import React, { useState } from 'react';
import movieCategories from '../../helperFuncs/movieCategories/movieCategories';
import { Nav, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './MovieBox.css';

let baseImageUrl = 'https://image.tmdb.org/t/p/w500';

const MovieBox = ({ movie, isAClickBox }) => {
  let history = useHistory();
  const [currentMovie, setCurrentMovie] = useState(movie);

  const movieClickHandler = () => {
    history.push({
      pathname: `/movie/${movie.original_title}`,
      state: movie,
    });
  };

  const favoritesHandler = () => {
    let favoritesMovies = JSON.parse(localStorage.getItem('favoritesMovies'));
    if (!currentMovie.isFavorite) {
      if (!favoritesMovies) {
        favoritesMovies = [];
      }
      favoritesMovies.push({ ...currentMovie, isFavorite: true });
      localStorage.setItem('favoritesMovies', JSON.stringify(favoritesMovies));
    } else {
      const editedFavoriteMovies = favoritesMovies.filter(
        (favMovie) => favMovie.id !== movie.id
      );
      localStorage.setItem(
        'favoritesMovies',
        JSON.stringify(editedFavoriteMovies)
      );
    }
    setCurrentMovie((current) => ({
      ...current,
      isFavorite: !current.isFavorite,
    }));
  };

  return (
    movie && (
      <div className='movie-box-container'>
        <Card className='movie-box__card'>
          {isAClickBox ? (
            <a onClick={movieClickHandler}>
              <Card.Img
                className='movie-box__card-img'
                src={baseImageUrl + movie.poster_path}
              />
            </a>
          ) : (
            <Card.Img
              className='movie-box__card-img'
              src={baseImageUrl + movie.poster_path}
            />
          )}
          <Card.Body className='movie-box__card-body'>
            {isAClickBox ? (
              <a onClick={() => movieClickHandler(movie)}>
                <Card.Title className='movie-box__card-title'>
                  {movie.original_title} ({movie.release_date.split('-')[0]})
                </Card.Title>
              </a>
            ) : (
              <Card.Title className='movie-box__card-title'>
                {movie.original_title} ({movie.release_date.split('-')[0]})
              </Card.Title>
            )}
            <Card.Subtitle className='movie-box__card-subtitle'>
              {movieCategories(movie.genre_ids)}
            </Card.Subtitle>
            <Card.Text>{movie.overview}</Card.Text>
            <Nav.Link
              className='movie-box-container__link'
              href={`https://m.imdb.com/find?q=${movie.original_title}&ref_=nv_sr_sm`}
            >
              visit official site
            </Nav.Link>
            <Button
              className={`favorite-btn ${
                currentMovie.isFavorite && 'red-border'
              }`}
              onClick={favoritesHandler}
            >
              {currentMovie.isFavorite
                ? 'Remove From Favorites'
                : 'Add To Favorites'}
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  );
};
export default MovieBox;
