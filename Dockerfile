FROM node:10.15.0

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

# Install libraries
RUN yarn install
RUN yarn global add pm2
RUN yarn build

# Bundle app source
COPY ./dist .

EXPOSE 3333

CMD [ "pm2-runtime", "app.js" ]