FROM node:16-alpine
WORKDIR /usr/backend
COPY package.json ./
RUN npm install --location=global npm@latest
USER node
EXPOSE 3001
COPY . ./
CMD [ "npm", "start"]
#  ...
