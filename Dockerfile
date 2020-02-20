FROM node:latest

WORKDIR /usr/src/nestjs-api-app

COPY package*.json ./

RUN if [ "$NODE_ENV" = "dev" ]; \
	then npm install;  \
	else npm install --only=prod; \
	fi

COPY . .