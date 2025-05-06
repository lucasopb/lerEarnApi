FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g typescript ts-node-dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
