# Dockerfile para o Service 1
FROM node:20-alpine

WORKDIR /api-gateway

COPY yarn*.json ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]