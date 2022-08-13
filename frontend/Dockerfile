FROM node:16-alpine3.14  AS build

WORKDIR /usr/frontend/

COPY package*.json ./

RUN npm install --silent 

COPY . .

RUN npm run build

FROM nginx:1.16.0-alpine AS prod

COPY --from=build /usr/frontend/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx-debug", "-g", "daemon off;"]