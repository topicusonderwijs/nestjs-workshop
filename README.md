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

# Assignment 4 - Database

For now our server is using a hardcoded list as data source. In a real world app we would use some sort of database for
this. NestJS has build in support for connecting and managing to a
database (https://docs.nestjs.com/techniques/database). For this assignment we will be using a in-memory
database (https://www.npmjs.com/package/sqlite3). We will use the `typeorm` plugin of NestJS to connect with the
database.

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

In the current state the app won't work since it is missing some logic. You can check this by running npm run test:e2e

Your assignment is to make the test pass, by fixing the broken code.
