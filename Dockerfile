FROM node:16.16.0-alpine
# FROM node:19-slim

RUN mkdir -p /frontend
WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm install 


COPY . .

EXPOSE 8080

CMD ["npm", "start"]
