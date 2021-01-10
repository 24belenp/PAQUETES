
FROM node:9-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY index.js .
COPY server.js .
COPY db.js .
COPY package.js .

EXPOSE 4050

CMD npm start