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

# Assignment 2 - Validation

Now that we have a working app with some endpoints we can add validation to these endpoints.  
NestJS has a build in system for validating the objects you receive in your endpoints.  
You can also create your own validation rules, called Pipes. These pipes can be added to your endpoints using
the `@UsePipes` annotation.  
https://docs.nestjs.com/pipes

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

In the current state the app won't work since it is missing some logic.
You can check this by running `npm run test:e2e`

Your assignment is to make the test pass, by fixing the broken code.
