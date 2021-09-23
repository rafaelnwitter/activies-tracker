FROM node:12-alpine

RUN apk add --no-cache bash

RUN npm config set cache /home/node/activies-tracker/.npm-cache --global

RUN npm i -g @nestjs/cli@7.6.0

USER node

WORKDIR /home/node/activies-tracker