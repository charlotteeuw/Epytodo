FROM node:20-alpine

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]