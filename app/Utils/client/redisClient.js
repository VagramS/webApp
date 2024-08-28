const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  url: 'redis://localhost:6379', // Replace with your Redis server URL if it's not running locally
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
