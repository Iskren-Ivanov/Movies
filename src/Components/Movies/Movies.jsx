import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../loader/loader';
import SearchForm from '../../UI/SearchForm/SearchForm';
import MovieBox from '../MovieBox/MovieBox';

import './Movies.css';

const apiKey = '03a0f0419a078bea277a38b7a36769e1';

const Movies = ({ location }) => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMovies(location.searchState);
  }, [location.searchState]);

  const getMovies = async (searchMovie) => {
    let data = [];
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchMovie}&page=1&include_adult=false`;

    if (searchMovie && searchMovie.trim() !== '') {
      setLoading(true);
      await axios
        .get(url)
        .then((response) => {
          let favoritesMovies = JSON.parse(
            localStorage.getItem('favoritesMovies')
          );
          if (response.status === 200) {
            data = response.data.results.map((movie) => {
              favoritesMovies &&
                favoritesMovies.forEach((favMovie) => {
                  if (movie.id === favMovie.id) {
                    movie.isFavorite = true;
                  }
                });
              if (!movie.hasOwnProperty('isFavorite')) {
                movie.isFavorite = false;
              }
              return movie;
            });
          }
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });

      setMovieData(data);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className='movies-container'>
      <div className='movies-container__search-form'>
        <div>
          <h3>Search</h3>
          <SearchForm isWhiteBackground={true} />
        </div>
      </div>
      <div className='movies-container__content'>
        {movieData.length > 0
          ? movieData.map((movie) => (
              <MovieBox movie={movie} isAClickBox={true} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Movies;
