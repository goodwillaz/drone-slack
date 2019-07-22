FROM node:10.15-alpine
MAINTAINER Matt Zuba <matt.zuba@goodwillaz.org>

WORKDIR /app

# Do this separately because these don't change often and can be cached
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENTRYPOINT ["/usr/local/bin/node", "/app/dist/main.js"]
