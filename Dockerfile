FROM node:latest

RUN mkdir -p /usr/src/nestjs-api-app

WORKDIR /usr/src/nestjs-api-app

COPY package*.json ./

RUN npm install

COPY . .