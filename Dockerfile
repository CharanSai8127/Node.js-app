# Stage 1: Build client
FROM node:18-alpine AS client-build

WORKDIR /usr/src/app/client

COPY client/package*.json ./
RUN npm install

COPY client/ .
RUN npm run build

# Stage 2: Build server
FROM node:18-alpine AS server-build

WORKDIR /usr/src/app/server

COPY server/package*.json ./
RUN npm install

COPY server/ .

# Stage 3: Runtime image
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy server code
COPY --from=server-build /usr/src/app/server ./server

# Copy built client assets
COPY --from=client-build /usr/src/app/client/dist ./client/public

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server/server.js"]

