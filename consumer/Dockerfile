# Dockerfile.consumer
FROM node:20-alpine
WORKDIR /app
COPY consumer.js .
RUN npm init -y && npm install redis mysql2
CMD ["node", "consumer.js"]
