# builder
FROM node:16-alpine as builder
WORKDIR /app
COPY package.json /app/
RUN yarn --registry=https://registry.npm.taobao.org && yarn cache clean
COPY . /app
RUN yarn build:prod

# server environment
FROM nginx:alpine
COPY /nginx/ /etc/nginx/
COPY /dist/ /usr/share/nginx/html/
EXPOSE 80



