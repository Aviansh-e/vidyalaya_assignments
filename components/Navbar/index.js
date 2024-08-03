import React from 'react';
import styled from '@emotion/styled';

// Styled Navbar component with position fixed to make it stick to the top
const Navbar = styled('nav')(() => ({
  position: 'fixed',  // Ensures the navbar is fixed
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  top: 0,
  left: 0,
  zIndex: 1000,
  padding: '10px 0',  // Optional: Add padding for better spacing
}));

const ListItem = styled('li')(() => ({
  display: 'inline-block',
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
}));

const Link = styled('a')(() => ({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

const TopNavbar = () => {
  return (
    <Navbar>
      <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
        <ListItem>
          <Link href={'/'}>Home</Link>
        </ListItem>
        <ListItem>
          <Link href={'/users'}>Users</Link>
        </ListItem>
      </ul>
    </Navbar>
  );
};

export default TopNavbar;
