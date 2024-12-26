# Dockerfile
FROM node:22

WORKDIR /fincheck

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 5000

CMD ["yarn", "start:dev"]
