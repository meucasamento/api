FROM node:alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

# Install libraries
RUN yarn install

# Bundle app source
COPY . .
COPY --chown=node:node . .

EXPOSE 3333