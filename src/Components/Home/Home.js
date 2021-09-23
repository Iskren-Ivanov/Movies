import React, { useEffect, useState } from 'react';
import { Nav, Card, Row, Col, Image, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import './Home.css';
const Home = () => {
  let baseImageUrl = 'https://image.tmdb.org/t/p/w500';
  const history = useHistory();
  const [favoritesMovies, setFavoritesMovies] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoritesMovies'));
    if (data) {
      setFavoritesMovies(data);
    }
  }, []);

  const favoriteClickHandler = (favoriteMovie) => {
    history.push({
      pathname: `/movie/${favoriteMovie.original_title}`,
      state: favoriteMovie,
    });
  };

  return (
    <div className='home-container'>
      <div className='home-container__top'>
        <div className='home-container__top-content'>
          <Card className='home-container__card'>
            <Card.Body>
              <Card.Title className='home-container__head'>Heading</Card.Title>
              <Card.Text className='home-container__content'>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit.
              </Card.Text>
              <Nav
                style={{ margin: '0 auto' }}
                variant='pills'
                defaultActiveKey='https://www.lipsum.com/'
              >
                <Nav.Item className='home-container__content-nav-item'>
                  <Nav.Link href='https://www.lipsum.com/'>Search</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className='home-container__bottom'>
        <div className='home-container__bottom-my-favorites'>
          <h2>Your Favorites</h2>
          <Row className='home-container__bottom-row'>
            {favoritesMovies.map((movie) => (
              <Button
                key={movie.id}
                className='home-container__bottom-button'
                onClick={() => favoriteClickHandler(movie)}
              >
                <Col s={1} md={2.5}>
                  <Image src={baseImageUrl + movie.poster_path} alt='img' />
                </Col>
              </Button>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
