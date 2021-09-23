import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import SearchForm from '../../UI/SearchForm/SearchForm';

import './NavBar.css';

const NavBar = () => (
  <div className='navbar-container'>
    <Navbar variant='dark'>
      <Nav className='mr-auto'>
        <Nav.Link href='/'>My Movie Collection</Nav.Link>
      </Nav>
      <SearchForm isWhiteBackground={false} />
    </Navbar>
  </div>
);

export default NavBar;
