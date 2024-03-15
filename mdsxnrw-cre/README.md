# MDSxNRW CRE

TBD

## Docker 🐳

Everything to run an instance of MDSxNRW is provided using docker.
All services, packages and databases can be run with a single command.

### Docker run MDSxNRW

First you need to set the needed ENVs.
This can e.g. be done by creating a .env in the root of the project folder.
There is already a `.env.default` file that you can copy/rename.
Then, just run the provided `docker-compose.yml`.

```sh
# up services
docker compose -f "docker-compose.yml" up -d --build
```

```sh
# down services
docker compose --file "docker-compose.yml" --project-name "mdsxnrw-cre" down
```

### Docker build apps

This section explains how to build docker images locally.
This is sometimes needed to e.g. test if new versions of our software is still running inside of containers.
For your local development you can give the image any name/tag you want.
Just remember that `docker-compose.yml` uses fixed names.

> ! Currently there is no GitLab pipeline building our images. We will need to do it by hand.

```sh
# build mdsxnrw-frontend
docker build -f apps/mdsxnrw-frontend/Dockerfile . -t registry.gitlab.cc-asp.fraunhofer.de/mdsxnrw/mdsxnrw-cre/mdsxnrw-frontend:<version>
```

```sh
# build mdsxnrw-backend
docker build -f apps/mdsxnrw-backend/Dockerfile . -t registry.gitlab.cc-asp.fraunhofer.de/mdsxnrw/mdsxnrw-cre/mdsxnrw-backend:<version>
```

## Copyright

Fraunhofer ISST 2023 ©
