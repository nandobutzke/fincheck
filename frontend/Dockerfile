# Dockerfile
FROM node:22

WORKDIR /fincheck

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
