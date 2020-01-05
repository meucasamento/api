FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

COPY . /app

EXPOSE 3333