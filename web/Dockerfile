FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

FROM nginx:alpine

COPY --from=builder /app /usr/share/nginx/html/