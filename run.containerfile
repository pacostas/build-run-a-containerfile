#### Build stage
FROM node:18 AS build
WORKDIR /usr/src/app
COPY package*.json ./

# Install all dev and production dependencies
RUN npm ci

## Copy the typescript source code
COPY . .

# By Building the Typescript source code, we get the dist folder
RUN npm run build:ts

#### Run stage
FROM node:18-slim

# We specify the production environment
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=2048"

WORKDIR /usr/src/app

# we install only production node modules
COPY --chown=node:node --from=build /usr/src/app/package*.json/ .
RUN npm ci --omit=dev

# We copy the dist folder which has the transpilled code, from the build stage
COPY --chown=node:node --from=build /usr/src/app/dist/ dist/

# Copy over and set entrypoint using the init script
COPY --chown=node:node ./init-wrapper ./init-wrapper
RUN chmod +x init-wrapper
ENTRYPOINT [ "./init-wrapper" ]

USER node

CMD [ "node", "dist/server.js" ]