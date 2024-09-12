const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://redis:6379',  // Use localhost and port 6379 since it's mapped
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
