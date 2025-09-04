# Dockerfile.producer
FROM node:20-alpine
WORKDIR /app
COPY producer.js .
RUN npm init -y && npm install redis mysql2
CMD ["node", "producer.js"]
