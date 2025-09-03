FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY producer.js ./
CMD ["node", "producer.js"]