FROM node:alpine3.20 AS build

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build


FROM nginx:alpine3.19

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /client/dist ./