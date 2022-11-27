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

# Assignment 3 - Swagger

Now that we have validated endpoints for our server its time to add some documentation.  
NestJS uses the OpenAPI spec to add documentation to your projects. For this it uses the swagger lib.
In this assignment you must complete the swagger docs. We have setup the swagger plugin so it runs
on `http://localhost:3000/api` (see `main.config.ts`)

Start the server with `npm run start` and navigate to `http://localhost:3000/api` to see the basic swagger page

- Make sure you separate sections in your docs for the pizza and review endpoint, dont use the `default` section.
- Make sure you add descriptions for the responses
- Make sure you get a working example value of the objects returned by the endpoints

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
