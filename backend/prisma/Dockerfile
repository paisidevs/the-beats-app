# pull official base image
FROM node:current-alpine

RUN mkdir /app
WORKDIR /app

COPY . ./prisma/

CMD npx prisma studio --experimental