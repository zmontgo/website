
FROM node:18-alpine

WORKDIR /app
EXPOSE 3000
ENV NODE_ENV production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

CMD [ "yarn", "start" ]
