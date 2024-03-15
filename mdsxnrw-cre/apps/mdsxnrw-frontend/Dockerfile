# Base image
FROM node:18.16-bullseye-slim as builder

# Create app directory
WORKDIR /usr/src

# copy needed files for building
COPY package.json ./
COPY yarn.lock ./
COPY apps/mdsxnrw-frontend/package.json ./apps/mdsxnrw-frontend/

# install and build
RUN yarn install
COPY apps/mdsxnrw-frontend ./apps/mdsxnrw-frontend
RUN yarn run frontend:build


# second stage
FROM nginx:1.24.0-bullseye

# copy root node_modules and package.json
COPY --from=builder /usr/src/node_modules ./node_modules
COPY --from=builder /usr/src/package.json ./

# copy needed files for running
COPY --from=builder /usr/src/apps/mdsxnrw-frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/apps/mdsxnrw-frontend/build /usr/share/nginx/html

COPY --from=builder /usr/src/apps/mdsxnrw-frontend/package.json ./apps/mdsxnrw-frontend/
#COPY --from=builder /usr/src/apps/mdsxnrw-backend/node_modules ./apps/mdsxnrw-backend/node_modules

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

