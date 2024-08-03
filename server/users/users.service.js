const axios = require('axios').default;


const url1 = "https://jsonplaceholder.typicode.com/users"; // this is the previous one api

async function fetchAllUsers() {
  try {
    const { data: users } = await axios.get(url1,);
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}
// Route to fetch user are https://jsonplaceholder.typicode.com/users/:userId
async function fetchUserById(id) {

  return {}
}

module.exports = { fetchAllUsers, fetchUserById };
