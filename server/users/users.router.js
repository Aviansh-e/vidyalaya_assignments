const express = require('express');
const { fetchAllUsers, fetchUserById } = require('./users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (err) {
    console.log("error is :", err);
  }

});

module.exports = router;
