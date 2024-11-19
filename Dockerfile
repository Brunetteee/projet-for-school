FROM node:20-alpine

MAINTAINER Evangelina

RUN mkdir /app
WORKDIR /app

COPY ./backend/package.json ./backend/package-lock.json ./

RUN npm i

COPY ./backend /app

COPY ./backend/.husky /app/.husky

RUN chown -R node:node /app

CMD ["npm", "start"]


