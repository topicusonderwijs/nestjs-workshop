## Description

Topicus Pizza Server

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Assignment 5 - Configuration and logging

This server is still using some hardcoded values. NestJS has a build in configuration module which you can use to read
this configuration from config files (https://docs.nestjs.com/techniques/configuration).

This server is also not yet logging anything. We want to change this by adding a logging
lib (https://github.com/iamolegga/nestjs-pino)

This assignment is simple, change the port of the server from 3000 to the value you set in the `.env` file, and add
logging to all REST endpoints

We have setup a base NestJS project which represents a Pizza server with 2 endpoints:

- `http://localhost:3000/pizza` for listing and creating pizza's
- `http://localhost:3000/review` for posting reviews on a pizza

The data model for this:

```
-------------
|   Pizza   |
-------------
      |
      |
     /|\
-------------
|  Review   |
-------------
```
