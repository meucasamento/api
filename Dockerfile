FROM node:10.15.0

# Create app directory
RUN mkdir /app
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

# Install libraries
RUN yarn && yarn global add typescript ts-node

# Bundle app source
COPY . .
COPY --chown=node:node . .

RUN yarn build

EXPOSE 3333
CMD [ "yarn", "dev" ]