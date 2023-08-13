FROM node:latest

WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
RUN npm i --global http-server
WORKDIR /app/build
CMD ["http-server"]