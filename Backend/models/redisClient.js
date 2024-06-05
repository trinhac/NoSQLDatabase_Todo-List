// redisClient.js

const redis = require('redis');

// Create Redis client
const client = redis.createClient();

client.on('connect', () => {
    console.log('Connected to Redis');
});

module.exports = client;