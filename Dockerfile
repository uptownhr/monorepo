FROM node:18-alpine
WORKDIR /app

ENV NX_CLOUD_DISTRIBUTED_EXECUTION=false

COPY . .
RUN yarn
RUN yarn prisma:generate prisma
RUN yarn build
RUN yarn workspaces focus --production

#HEALTHCHECK --interval=12s --timeout=12s --start-period=30s CMD node /home/node/app/dist/healthcheck.js
EXPOSE 3000

CMD node --enable-source-maps dist/apps/api/main.js
