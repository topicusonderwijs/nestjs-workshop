# nestjs-workshop

https://github.com/topicusonderwijs/nestjs-workshop  
topicus-guest

This is a public repository setup for the Topicus NestJS workshop. This repository contains a sample project for a
NestJS API server.

The final project can be found in the 'final' branch.  
It also contain 6 assignment branches to explain certain concepts of NestJS.
Each assignment branch contains the assignment in the `README`, There are also hints to be found in the code.

More info on NestJS: https://docs.nestjs.com/

## Assignment 1 - Controllers

NestJS makes it easy to create REST endpoints for your API server. These endpoints are called controllers.
Controllers can make use of services for the business logic of your app.
The services can be injected using the DI system of NestJS.

```
In this assignment you will get some basic knowledge on NestJS controllers for setting up REST APIs
```

## Assignment 2 - Validation

Now that we have a working app with some endpoints we can add validation to these endpoints.
NestJS has a build in system for validating the objects you receive in your endpoints.
You can also create your own validation rules, called Pipes. These pipes can be added to your endpoints using the
@UsePipes annotation.
https://docs.nestjs.com/pipes

```
In this assignment you will get some basic knowledge on NestJS validation module 
for validating your REST APIs
```

## Assignment 3 - Swagger

Now that we have validated endpoints for our server its time to add some documentation.
NestJS uses the OpenAPI spec to add documentation to your projects. For this it uses the swagger lib. In this assignment
you must complete the swagger docs.

```
In this assignment you will get some basic knowledge on NestJS OpenAPI spec implementation 
using Swagger
```

## Assignment 4 - Database

For now our server is using a hardcoded list as data source. In a real world app we would use some sort of database for
this. NestJS has build in support for connecting and managing to a
database (https://docs.nestjs.com/techniques/database). For this assignment we will be using a in-memory
database (https://www.npmjs.com/package/sqlite3). We will use the typeorm plugin of NestJS to connect with the database.

```
In this assignment you will get some basic knowledge on NestJS typeorm implementation 
for working with databases
```

## Assignment 5 - Configuration and logging

This server is still using some hardcoded values. NestJS has a build in configuration module which you can use to read
this configuration from config files (https://docs.nestjs.com/techniques/configuration).

This server is also not yet logging anything. We want to change this by adding a logging
lib (https://github.com/iamolegga/nestjs-pino)

```
In this assignment you will get some basic knowledge on NestJS 
configuration management, and use a logging lib
```

## Assignment 6 - Authentication

Until now the endpoints on this server where public. We changed this by adding a authentication module. NestJS has build
in support for adding authentication (https://docs.nestjs.com/security/authenticationnpm ) using
passport (https://www.npmjs.com/package/passport)

The new auth module is added to the app.module.ts and is providing a hardcoded username/password login (user.service.ts)
. When you use the login endpoint with a hardcoded user you will receive an access token JWT. This JWT can be used to
secure your pizza and review endpoint.

```
In this assignment you will get some basic knowledge on NestJS 
authentication support using passport
```

## Extras

There is an extra branch `final-graphql` in which we have setup an implementation of an graphql endpoint for the pizza
server
