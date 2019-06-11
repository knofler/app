FROM node:latest

COPY . app/
# COPY ./aircanteen/app/ app/app
# COPY ./aircanteen/internals/scripts app/internals/scripts
# COPY ./aircanteen/package.json app/package.json
# COPY ./aircanteen/yarn.lock app/yarn.lock
# COPY .aircanteen/build app/build
# COPY .aircanteen/server app/server

WORKDIR app/

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