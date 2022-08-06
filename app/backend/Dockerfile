FROM node:16-alpine
WORKDIR /usr/backend
COPY package.json ./
RUN npm install --location=global npm@latest
EXPOSE 3001
COPY --chown=node:node . /usr/backend
USER node
CMD [ "npm", "start"]
#  ...
