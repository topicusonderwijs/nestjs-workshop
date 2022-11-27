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

# Assignment 4 - Configuration and logging

Until now the endpoints on this server where public. We changed this by adding a authentication module. NestJS has build
in support for adding authentication (https://docs.nestjs.com/security/authenticationnpm ) using
passport (https://www.npmjs.com/package/passport)

The new auth module is added to the `app.module.ts` and is providing a hardcoded username/password
login (`user.service.ts`). When you use the login endpoint with a hardcoded user you will receive an access token JWT.
This JWT can be used to secure your pizza and review endpoint.

For this assignment you will need to fix/implement the following tasks:

- Add Bearer authentication to swagger (`main.config.ts`) so that you get an authorization button in your swagger page
- Tell swagger that you controllers you use Bearer authentication (https://docs.nestjs.com/openapi/security)
- Add security to the pizza and review endpoint by adding a `guard`
- When you add security you your endpoints the tests will start to fail, fix this by overriding the security for
  tests (https://docs.nestjs.com/fundamentals/testing#end-to-end-testing)

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
