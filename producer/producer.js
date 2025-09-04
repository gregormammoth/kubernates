// producer.js
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

  const message = 'Hello Redis + MariaDB!';
  await redisClient.set('latest_message', message);
  console.log(`[x] Saved to Redis: ${message}`);

  // MariaDB
  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  });

  await connection.execute(`CREATE TABLE IF NOT EXISTS messages (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(255))`);
  await connection.execute(`INSERT INTO messages (text) VALUES (?)`, [message]);
  console.log(`[x] Saved to MariaDB: ${message}`);

  await connection.end();
  await redisClient.disconnect();
})();
