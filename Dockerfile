FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE 3333