import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import './SearchForm.css';

const SearchForm = ({ isWhiteBackground }) => {
  const history = useHistory();
  const [search, setSearch] = useState('');

  const searchHandler = (searchMovie) => {
    history.push({
      pathname: '/movies',
      searchState: searchMovie,
    });
  };

  return (
    <InputGroup className='search-form-container'>
      <FormControl
        className='search-form-container__input'
        placeholder='Search by movie title...'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyPress={(event) => event.key === 'Enter' && searchHandler(search)}
      />
      <Button
        className={
          isWhiteBackground
            ? 'search-form-container__button whiteBtn'
            : 'search-form-container__button'
        }
        onClick={() => searchHandler(search)}
      >
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchForm;
