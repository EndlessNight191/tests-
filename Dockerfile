FROM node:14

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

COPY .env .env

RUN npx migrate

RUN npm test

CMD ["node", "app.js"]
