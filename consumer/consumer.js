// consumer.js
const redis = require('redis');
const mysql = require('mysql2/promise');

const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'redispass';
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
// const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_PORT = 6379;

const MYSQL_HOST = process.env.MYSQL_HOST || 'mariadb';
const MYSQL_USER = process.env.MYSQL_USER || 'appuser';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'user';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'appdb';

(async () => {
  // Redis
  const url = `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`;
  const redisClient = redis.createClient({ url });
  redisClient.on('error', (err) => console.error('Redis Client Error', err));
  await redisClient.connect();

  const latestMessage = await redisClient.get('latest_message');
  console.log(`[x] Latest from Redis: ${latestMessage}`);
  await redisClient.disconnect();

  // MariaDB
  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  });

  const [rows] = await connection.execute(`SELECT * FROM messages`);
  console.log('[x] All messages from MariaDB:');
  console.table(rows);

  await connection.end();
})();
