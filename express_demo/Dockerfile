FROM node:15.2.1-alpine3.10
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ .
EXPOSE 80
CMD ["npm", "start"]
