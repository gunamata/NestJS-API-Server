FROM node:latest

WORKDIR /usr/src/nestjs-api-app

COPY package*.json ./

RUN npm install

COPY . .