# pull official base image
FROM node:current-alpine
# set working directory
RUN mkdir -p /backend
WORKDIR /backend
# install app dependencies
COPY package.json ./
RUN npm install
# add backend
COPY . ./
RUN rm -rf ./prisma/.env
# RUN psql -h host.docker.internal -d tba -U postgres -f ./prisma/schema.sql
RUN echo DATABASE_URL="postgresql://postgres:prisma@host.docker.internal:5432/tba" >> ./prisma/.env
RUN npx prisma migrate up --experimental
RUN npx prisma generate
# RUN rm -rf ./prisma/.env
# start backend
CMD npm start
EXPOSE 4000