FROM node:latest as build-stage

WORKDIR /usr/app
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3030