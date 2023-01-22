ARG NODE_VERSION=16
ARG CLIENT_PORT=3000
ARG SERVER_PORT=3001

FROM node:$NODE_VERSION-buster as base

WORKDIR /var/www/html

FROM base as builder

COPY ["package.json", "lerna.json", "./"]

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn lerna bootstrap

RUN rm -rf /var/www/html/packages/client/dist/ && \
    rm -rf /var/www/html/packages/server/dist/ && \
    yarn build --scope=client

FROM nginx:latest as front

WORKDIR /var/www/html

COPY --from=builder /var/www/html/packages/client/dist/ ./packages/client/dist/
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

CMD [ "nginx", "-g", "daemon off;" ]

FROM base as back

WORKDIR /var/www/html

CMD node ./packages/server/index.js