FROM node:alpine3.20 AS build

ARG VITE_BACKEND_URL
ARG VITE_FRONTEND_URL

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_FRONTEND_URL=$VITE_FRONTEND_URL

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:alpine3.19

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /client/dist ./