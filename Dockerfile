FROM node:latest

RUN mkdir /usr/src/nestjs-api-app

WORKDIR /usr/src/nestjs-api-app

COPY package*.json ./

RUN npm install

COPY . .