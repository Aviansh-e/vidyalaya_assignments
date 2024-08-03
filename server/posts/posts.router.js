const express = require('express');
const axios = require('axios');
const { fetchPosts } = require('./posts.service');

const router = express.Router();

// using try and catch method to handle error
// using the promise.all for handling the asynchrous data efficiently
// then created a array of photos and then stores three values

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();
    // console.log(posts);

    const postsWithImages = await Promise.all(
      posts.map(async (post) => {

        const { data: photos } = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`
        );

        const images = photos.slice(0, 3).map(photo => ({ url: photo.url }));
        // console.log(image);

        return {
          ...post,
          images,
        };
      })
    );

    res.json(postsWithImages);
  }
  catch (err) {
    console.error('Error fetching posts with images is:', err);
    res.status(500).json({ error: 'Failed in fetching images from the post' });
  }
});

module.exports = router;
