## The App

Is a basic server built in Node.js which does the following items:

- Has at least one dependency - helmet
- Has at least one dev dependency - eslint
- Connects to a fake database
- Has one endpoint `/users` which returns two users in json format
- Conditionaly registers handlers for the `SIGHUP`, `SIGTERM` and `SIGINT` signals by setting the `REGISTER_SIGNAL_HANDLERS` env variable to `true`
- Prints out the available heap size in MBs

## Prerequisites

### Docker or Podman CLI:

#### Windows:

- [Docker](https://docs.docker.com/desktop/install/windows-install/)
- [Podman](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md)

#### Linux:

- [Docker](https://docs.docker.com/desktop/install/linux-install/)
- [Podman](https://podman.io/docs/installation#installing-on-linux)

## Build & run the container image

### Build the image:

With docker

```bash
docker build -t containerized-node-app-image . -f run.containerfile
```

With podman

```bash
podman build -t containerized-node-app-image . -f run.containerfile
```

### Run the container:

With docker

```sh
docker run -p 3000:3000 --name containerized-node-app containerized-node-app-image
```

With podman

```sh
podman run -p 3000:3000 --name containerized-node-app containerized-node-app-image
```

### Make a request to the application

```bash
curl http://localhost:3000/users
```

### Remove the container:

With docker

```sh
docker rm -f containerized-node-app
```

With podman

```sh
podman rm -f containerized-node-app
```

### See the processes inside the container

With docker

```sh
docker exec -it containerized-node-app sh -c "top"
```

With podman

```sh
podman exec -it containerized-node-app sh -c "top"
```

### Enable the registered listeners

With docker

```sh
docker run -p 3000:3000 -e REGISTER_SIGNAL_HANDLERS=true --name containerized-node-app containerized-node-app
```

With podman

```sh
podman run -p 3000:3000 -e REGISTER_SIGNAL_HANDLERS=true --name containerized-node-app containerized-node-app
```

### Sh into the container

With docker

```sh
docker exec -it containerized-node-app sh
```

With podman

```sh
docker exec -it containerized-node-app sh
```
