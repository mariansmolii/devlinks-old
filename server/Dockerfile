FROM node:alpine3.20    

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 1111

CMD ["npm", "run", "dev"]
