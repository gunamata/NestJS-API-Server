FROM node:latest AS dev
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8081
CMD node start


FROM node:latest AS prod
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8081
CMD set NODE_ENV=prod&& npm run build && npm run start:prod