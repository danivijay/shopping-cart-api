FROM alpine:3

LABEL maintainer: "danimvijay@gmail.com"

RUN apk add --update nodejs nodejs-npm

COPY . /src

WORKDIR /src

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "node", "./server.js" ]
