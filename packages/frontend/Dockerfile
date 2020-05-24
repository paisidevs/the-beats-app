# pull official base image
FROM node:current-alpine
# bring in our GPR_TOKEN build arg so that we can pull from GitHub Private Registry
ARG GPR_TOKEN 
ENV GPR_TOKEN=$GPR_TOKEN
# bring in our CLIENT_SCHEMA build args for GraphQL Code Generator
ARG CLIENT_SCHEMA 
ENV CLIENT_SCHEMA=$CLIENT_SCHEMA
# set working directory
RUN mkdir -p /app
WORKDIR /app
# install app dependencies
COPY .npmrc ./
COPY package.json ./
RUN npm install -f
# add app
COPY . ./
# clean up
RUN rm -f .npmrc
RUN rm -f .env
# start app
CMD npm start
EXPOSE 3000