## Description

```bash
This project contains the implementation of a NestJS/GraphQL API for a Todo app.
```

## Installation

```bash
$ npm install
```

## Running the app
```bash
# database
Run docker compose command to spin up a PostgreSQL container

# development
$ npm run start

# watch mode
$ npm run start:dev

# demo
When the server starts successfully, the GraphQL APIs can be tested at: http://localhost:3000/graphql

#authn & authz
The Todo endpoints are authenticated. You have to sign up and login to get access token to call the Todo endpoints successfully.
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```