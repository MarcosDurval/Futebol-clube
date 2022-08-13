FROM node:16.14.2-alpine3.14 AS build

WORKDIR /frontend

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npm run build

FROM nginx:1.16.0-alpine AS prod

COPY --from=build /frontend/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /frontend/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx-debug", "-g", "daemon off;"]
