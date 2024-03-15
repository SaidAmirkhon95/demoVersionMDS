# Base image
FROM node:18.16-bullseye-slim as builder

# Create app directory
WORKDIR /usr/src

# copy needed files for building
COPY package.json ./
COPY yarn.lock ./

COPY apps/mdsxnrw-backend/package.json ./apps/mdsxnrw-backend/

# Install app dependencies
RUN yarn install

COPY apps/mdsxnrw-backend ./apps/mdsxnrw-backend

# Generate prisma artefacts
RUN yarn prisma generate --schema ./apps/mdsxnrw-backend/prisma/schema.prisma

RUN yarn run backend:build

FROM node:18.16-bullseye-slim

# copy root node_modules and package.json
COPY --from=builder /usr/src/node_modules ./node_modules
COPY --from=builder /usr/src/package.json ./

# copy needed files for running
COPY --from=builder /usr/src/apps/mdsxnrw-backend/package.json ./apps/mdsxnrw-backend/
COPY --from=builder /usr/src/apps/mdsxnrw-backend/dist ./apps/mdsxnrw-backend/dist
COPY --from=builder /usr/src/apps/mdsxnrw-backend/node_modules ./apps/mdsxnrw-backend/node_modules
COPY --from=builder /usr/src/apps/mdsxnrw-backend/prisma ./apps/mdsxnrw-backend/prisma

# Don't forget to pass the environment variables to the container:
# DATABASE_URL
# AUTH_SERVER_URL, REALM, CLIENT_ID, SECRET

EXPOSE 3000
CMD ["yarn", "run", "backend:start:migrate:prod"]
