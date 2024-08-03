import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { WindowSizeProvider } from '../context/usewindowidth';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const UserName = styled.h3(() => ({
  margin: 0,
  padding: '2px',
}));

const Email = styled.h4(() => ({
  margin: 0,
  padding: '2px',
}));

const Initials = styled.h4(() => ({
  margin: '3px',
  padding: '3px',
  fontWeight: 'bold',
  fontSize: '20px',
  width: '50px',
  height: '50px',
  lineHeight: '34px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f4f4f4f4',
  color: '#00000',
}));

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 50,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -70,
        behavior: 'smooth',
      });
    }
  };

  const getInitials = (name) => {
    if (!name) return '';
    const [firstName, lastName] = name.split(' ');
    const firstInitial = firstName.charAt(0);
    const lastInitial = lastName.charAt(lastName.length - 1);
    return `${firstInitial}${lastInitial}`;
  };

  return (

    <PostContainer>
      {post.user && (
        <>
          <div style={{ display: 'flex' }}>
            <div>
              <Initials>{getInitials(post.user.name).toUpperCase()}</Initials>
            </div>
            <div>
              <UserName>{post.user.name}</UserName>
              <Email>{post.user.email}</Email>
            </div>
          </div>
        </>
      )}
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>

  );
};

Post.propTypes = {
  post: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
};

export default Post;
