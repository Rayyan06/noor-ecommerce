# syntax=docker/dockerfile:1
# base node image
FROM node:21-alpine as base

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

# Install all node_modules, including dev dependencies
FROM base as deps

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

ADD prisma .
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]