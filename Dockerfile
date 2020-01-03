FROM node:alpine

USER nobody

WORKDIR /app

COPY ./src ./app

EXPOSE 3333