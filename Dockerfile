ARG NODE_VERSION=16

ARG CLIENT_PORT=3000
ARG SERVER_PORT=3001

FROM node:$NODE_VERSION-buster as base

WORKDIR /app

COPY ["package.json", "lerna.json", "./"]

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn lerna bootstrap

RUN rm -rf /app/packages/client/dist/ \
    && rm -rf /app/packages/server/dist/

RUN yarn build

FROM nginx:latest as front

WORKDIR /app

COPY --from=base /app/packages/client/dist/ /app/
COPY --from=base /app/packages/client/nginx.conf /etc/nginx/nginx.conf

EXPOSE $CLIENT_PORT

CMD [ "nginx", "-g", "daemon off;" ]

FROM base as back

EXPOSE $SERVER_PORT

CMD [ "node", "/app/packages/server/index.js" ]