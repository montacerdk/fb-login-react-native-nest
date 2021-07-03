# FB Login React Native Nest

```
      ███████╗ ██████╗         ██╗       ██████╗   ██████╗  ██╗ ███╗   ██╗
      ██╔════╝ ██╔══██╗        ██║      ██╔═══██╗ ██╔════╝  ██║ ████╗  ██║
      █████╗   ██████╔╝ █████╗ ██║      ██║   ██║ ██║  ███╗ ██║ ██╔██╗ ██║
      ██╔══╝   ██╔══██╗ ╚════╝ ██║      ██║   ██║ ██║   ██║ ██║ ██║╚██╗██║
      ██║      ██████╔╝        ███████╗ ╚██████╔╝ ╚██████╔╝ ██║ ██║ ╚████║
      ╚═╝      ╚═════╝         ╚══════╝  ╚═════╝   ╚═════╝  ╚═╝ ╚═╝  ╚═══╝
```

In this project, you will fins the integration of Facebook login button in React Native app.
This app is connected with a Nest.js app that exposes regular sign in and sign up endpoints.

## Prerequisites

1. Use a Linux based system.
2. Install Make `sudo apt install make`.
3. Install [Docker](https://docs.docker.com/engine/install/ubuntu/) and [Docker Compose](https://docs.docker.com/compose/install/).

## Configure

You can get this porject up and running on your local dev environment in 1 minute.
You just need to create and fill the environment variables file `.env`.

## Run

In order to run this project in your local machine, run the `make local` command on the project root folder.
This will run `docker-compose down && docker-compose up -d --build --remove-orphans` and create the Backend containers.

- backend
- pg-db
- pgadmin

For the React Native app, you'll need to run it manually using NPM or Yarn.
