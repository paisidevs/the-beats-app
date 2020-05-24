# pull official base image
FROM node:current-alpine
# bring in our build arg so that we can pull from our private registry
ARG GPR_TOKEN 
ENV GPR_TOKEN=$GPR_TOKEN
# set working directory
RUN mkdir -p /app
WORKDIR /app
# install app dependencies
COPY .npmrc ./
COPY package.json ./
RUN npm install -f --silent
RUN rm -f .npmrc
# add app
COPY . ./
RUN rm -f .env
# start app
CMD npm start
EXPOSE 3000