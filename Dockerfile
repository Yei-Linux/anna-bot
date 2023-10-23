FROM node:16-alpine as bot
WORKDIR /app
COPY package*.json ./
RUN npm i --legacy-peer-deps
COPY . .
ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT
CMD ["npm", "start"]