FROM node:latest

COPY . react_aircanteen/
# COPY ./aircanteen/app/ react_aircanteen/app
# COPY ./aircanteen/internals/scripts react_aircanteen/internals/scripts
# COPY ./aircanteen/package.json react_aircanteen/package.json
# COPY ./aircanteen/yarn.lock react_aircanteen/yarn.lock
# COPY .aircanteen/build react_aircanteen/build
# COPY .aircanteen/server react_aircanteen/server

WORKDIR react_aircanteen/

# ENV NODE_ENV=development API_URL_Docker=test


RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN yarn
RUN npm install

# ARG REACT_APP_API_URL
# ENV REACT_APP_API_URL http://192.168.99.100:8080/api/

#Install production while building image for production stack
# RUN yarn install --production

EXPOSE 3000

ENTRYPOINT ["yarn", "run", "start"]