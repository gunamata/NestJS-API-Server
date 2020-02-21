FROM node:latest

WORKDIR /usr/src/nestjs-api-app

COPY package*.json ./

COPY . .

RUN npm install