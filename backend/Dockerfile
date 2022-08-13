FROM node:16-alpine3.14

WORKDIR /usr/backend

COPY package*.json ./

RUN npm install --silent

COPY . .

CMD [ "npm","start"]