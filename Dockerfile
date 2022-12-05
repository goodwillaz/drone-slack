FROM node:16-alpine AS base
MAINTAINER Matt Zuba <matt.zuba@goodwillaz.org>
WORKDIR /app
COPY package*.json ./

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

FROM base AS release
RUN npm ci --production && npm cache clean --force
COPY --from=build /app/dist ./dist/

ENTRYPOINT ["/usr/local/bin/node", "/app/dist/main.js"]
