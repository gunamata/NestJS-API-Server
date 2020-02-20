FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8081
CMD [ "set", "NODE_ENV=prod&&", "npm", "run", "build&&", "npm", "run", "start:prod" ]