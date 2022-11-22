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

## Assignment 1 - Controllers

NestJS makes it easy to create REST endpoints for your API server. These endpoints are called `controllers`.
Controllers can make use of services for the business logic of your app. The services can be injected using the DI
system of NestJS.

We have setup a base NestJS project which represents a Pizza server with 2 endpoints:

- /pizza for listing and creating pizza's
- /review for posting reviews on a pizza

The data model for this:
[TODO] insert fancy asci art here

In the current state the app won't work since it is missing some logic.
You can check this by running `npm run test:e2e`

Your assignment is to make the test pass, by fixing the broken code.
