import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
// import useWindowWidth from '../hooks/useWindowWidth';

import WindowSizeContext from '../context/Usecontext';



const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoad, setShowLoad] = useState(true);

  const isSmallerDevice = useContext(WindowSizeContext);

  // const { isSmallerDevice } = useWindowWidth();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, usersData] = await Promise.all([
          axios.get('/api/v1/posts', { params: { start: 0, limit: isSmallerDevice ? 5 : 10 } }),
          axios.get('/api/v1/users'),
        ]);

        setPosts(postsData.data);
        setUsers(usersData.data);
        console.log(isSmallerDevice);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [isSmallerDevice]);

  const handleClick = () => {
    setIsLoading(true);
    setShowLoad(false);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Merrging user and post data
  const postsWithUserData = posts.map(post => {
    const user = users.find(user => user.id === post.id); //
    return { ...post, user };
  });

  return (
    <Container>
      <PostListContainer>
        {postsWithUserData.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>
      {
        showLoad &&
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      }
    </Container>
  );
}
